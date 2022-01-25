import { configureStore } from '@reduxjs/toolkit';
import {
    entitiesSlice,
} from '@client-libs/entity-storage/slice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/root';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/src/getDefaultMiddleware';
import { EntityRepository } from '@client-libs/entity-storage/repository';
import { ReduxEntityStorage } from '@client-libs/entity-storage/storage';
import { GraphQLManager } from '@client-libs/graphql-operations/manager';
import { GraphQLClient } from 'graphql-request';

const gqlManager = new GraphQLManager(new GraphQLClient('/api'));

export interface AppContext {
    readonly gqlManager: GraphQLManager;
    readonly repository: EntityRepository;
}

const sagaMiddleware = createSagaMiddleware<{ get: () => AppContext }>({
    context: {
        get: () => ({
            gqlManager,
            repository
        })
    }
});

export const store = configureStore({
    reducer: {
        entities: entitiesSlice.reducer
    },
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat([
            sagaMiddleware
        ]);
    }
});
const repository: EntityRepository = new EntityRepository(new ReduxEntityStorage(store.getState.bind(store), store.dispatch));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);
