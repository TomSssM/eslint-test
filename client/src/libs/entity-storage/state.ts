import { EntityBase, Id } from '@shared/entity/entity-base';
import { EntityUniqKey } from './slice';

export enum FetchState {
    Idle = 'Idle',
    InProgress = 'InProgress',
    Error = 'Error'
}

export interface DataWithFetchState<E> {
    data?: E;
    version: number;
    fetchState: FetchState;
}

export interface EntityList {
    segments: {
        [index: number]: Array<EntityUniqKey>;
    };
    segmentsOrder: Array<number>;
    segmentSize: number;
    cacheLimit?: number;
    total?: number;
}

export type EntityState<E> = DataWithFetchState<E>;
export type EntityListState = DataWithFetchState<EntityList>;

export interface EntityCache<E extends EntityBase> {
    aliases: Record<string, EntityUniqKey>;
    items: Record<EntityUniqKey, EntityState<E>>;
    uniqKeyByIds: Record<Id, EntityUniqKey>;
    lists: {
        [name: string]: EntityListState;
    };
}

export interface EntitiesStorage {
    [entityName: string]: EntityCache<EntityBase>;
}

export interface StateWithEntities {
    entities: EntitiesStorage;
}
