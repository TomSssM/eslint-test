import { Class } from '@shared/base/class';
import { EntityBase, Id } from '@shared/entity/entity-base';
import {
    provideEntityFetchResult,
    provideListFetchResult,
    setEntityFetchInProgressState,
    setListFetchInProgressState
} from './slice';
import { Dispatch } from '@reduxjs/toolkit';
import { EntityListState, EntityState, StateWithEntities } from './state';
import { getEntitiesByIds, getEntityStateSelector, getListState } from './selectors';
import { EntityLocator, ListLocator } from './locators';
import { FetchEntityResult, FetchListResult } from './fetch-result';

export interface EntityStorageApi {
    getEntitiesByIds<E extends EntityBase>(entityType: Class<E>, ids: Array<Id>): Record<Id, E>;
    getEntityState<E extends EntityBase>(locator: EntityLocator<E>): EntityState<E> | undefined;
    getListState<E extends EntityBase>(locator: ListLocator<E>): EntityListState | undefined;
    setEntityFetchInProgressState<E extends EntityBase>(locator: EntityLocator<E>): { version: number };
    provideEntityFetchResult<E extends EntityBase>(result: FetchEntityResult<E>): void;
    setListFetchInProgressState<E extends EntityBase>(locator: ListLocator<E>): { version: number };
    provideListFetchResult<E extends EntityBase>(result: FetchListResult<E>): void;
    removeEntities<E extends EntityBase>(entityType: Class<E>, ids: Array<Id>): void;
}

export class ReduxEntityStorage implements EntityStorageApi {
    constructor(
        private readonly getState: () => StateWithEntities,
        private readonly dispatch: Dispatch
    ) {
    }

    public getEntityState<E extends EntityBase>(locator: EntityLocator<E>): EntityState<E> | undefined {
        return getEntityStateSelector(locator)(this.getState());
    }

    public getEntitiesByIds<E extends EntityBase>(entityType: Class<E>, ids: Array<Id>): Record<Id, E> {
        return getEntitiesByIds(this.getState(), entityType, ids);
    }

    public getListState<E extends EntityBase>(locator: ListLocator<E>): EntityListState | undefined {
        return getListState(this.getState(), locator);
    }

    public provideEntityFetchResult<E extends EntityBase>(result: FetchEntityResult<E>): void {
        this.dispatch(provideEntityFetchResult({ result }));
    }

    public provideListFetchResult<E extends EntityBase>(result: FetchListResult<E>): void {
        this.dispatch(provideListFetchResult({ result }));
    }

    public removeEntities<E extends EntityBase>(entityType: Class<E>, ids: Array<Id>): void {
    }

    public setEntityFetchInProgressState<E extends EntityBase>(locator: EntityLocator<E>): { version: number } {
        this.dispatch(setEntityFetchInProgressState({ locator }));
        return { version: getEntityStateSelector(locator)(this.getState())!.version };
    }

    public setListFetchInProgressState<E extends EntityBase>(locator: ListLocator<E>): { version: number } {
        this.dispatch(setListFetchInProgressState({ locator }));
        return { version: getListState(this.getState(), locator)!.version };
    }

}
