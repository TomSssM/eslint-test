import { all, takeEvery, call, select } from 'redux-saga/effects';
import { initApp } from '../slices/app';
import { SagaIterator } from 'redux-saga';
import { getAppContext } from './context';
import { DashboardRequest } from '../operations/dashboard';
import { DashboardEntity } from '@shared/metrika-dto/entities/dashboard';
import { MetricsSetRequest } from '../operations/metrics';
import { MetricsEntity } from '@shared/metrika-dto/entities/metrics';
import { MetricsSetArgs } from '@shared/metrika-dto/args/metrics';
import { PeriodInput } from '@shared/metrika-dto/args/period';
import { DateInput } from '@shared/metrika-dto/args/date';
import { getEntitySelector } from '@client-libs/entity-storage/selectors';
import { WidgetEntity } from '@shared/metrika-dto/entities/widget';

export function* appSaga(): SagaIterator {
    yield all([
        takeEvery(initApp, function* (): SagaIterator {
            const { gqlManager, repository } = yield* getAppContext();
            const operation = gqlManager.getEntityOperation(DashboardRequest);
            const operation2 = gqlManager.getListOperation(MetricsSetRequest);

            yield call(repository.fetchEntity.bind(repository),
                { entityType: DashboardEntity, alias: 'defaultDashboard' },
                operation,
                undefined);
            // TODO узнать, как типизировать
            const dashboard = <DashboardEntity> (yield select(
                getEntitySelector({ entityType: DashboardEntity, alias: 'defaultDashboard' }))
            );

            dashboard.widgets = dashboard.widgets.map(w => {
                const res = new WidgetEntity();
                // TODO remove after fix creating nested entities
                Object.entries(w).forEach(([k, v]) => {
                    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-unsafe-assignment
                    (<Object> res)[k] = v;
                });
                return res;
            });

            yield call(repository.fetchFixedList.bind(repository),
                { entityType: MetricsEntity, name: 'metrics' },
                operation2,
                new MetricsSetArgs(
                    ['35107250'],
                    new PeriodInput(
                        new DateInput(10, 11, 2021),
                        new DateInput(15, 11, 2021)
                    ),
                    dashboard.widgets.map(w => w.getMetricsRequest())
                )
            );
            // yield call(repository.fetchEntity.bind(repository),
            //     { entityType: CounterEntity, alias: 'defaultCounter' },
            //     operation,
            //     new CounterQueryArgs('37016985'));
        }),
    ]);
}
