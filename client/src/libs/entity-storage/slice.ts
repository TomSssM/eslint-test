import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityBase } from '@shared/entity/entity-base';
import { Class } from '@shared/base/class';
import { EntitiesStorage, EntityCache, FetchState } from './state';
import { EntityLocator, ListLocator } from './locators';
import { FetchEntityResult, FetchListResult } from './fetch-result';

export type EntityUniqKey = string;

// NOTE: don't use external library to reduce bundle size
export function generateEntityUniqKey(): string {
    function p(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return p() + p() + '-' + p() + '-' + p() + '-' + p() + '-' + p() + p() + p();
}

export interface SetEntityFetchInProgressStatePayload<E extends EntityBase> {
    locator: EntityLocator<E>;
}

export interface ProvideEntityFetchResultPayload<E extends EntityBase> {
    result: FetchEntityResult<E>;
}

export interface SetListFetchInProgressStatePayload<E extends EntityBase> {
    locator: ListLocator<E>;
}

export interface ProvideListFetchResultPayload<E extends EntityBase> {
    result: FetchListResult<E>;
}

function defineUniqIdByLocator<E extends EntityBase>(
    entityState: EntityCache<E>,
    locator: EntityLocator<E>,
): EntityUniqKey {
    let uniqKey: EntityUniqKey;

    if ('id' in locator) {
        if (!entityState.uniqKeyByIds[locator.id]) {
            entityState.uniqKeyByIds[locator.id] = generateEntityUniqKey();
        }
        uniqKey = entityState.uniqKeyByIds[locator.id];
    } else {
        if (!entityState.aliases[locator.alias]) {
            entityState.aliases[locator.alias] = generateEntityUniqKey();
        }
        uniqKey = entityState.aliases[locator.alias];
    }

    return uniqKey;
}

function defineEntityCache<E extends EntityBase>(state: EntitiesStorage, entityType: Class<E>): EntityCache<E> {
    const name = EntityBase.getNameByCls(entityType);

    if (!state[name]) {
        state[name] = {
            aliases: {},
            uniqKeyByIds: {},
            items: {},
            lists: {}
        };
    }

    return <EntityCache<E>>state[name];
}

export const entitiesSlice = createSlice({
    name: 'entities',
    initialState: <EntitiesStorage>{},
    reducers: {
        provideEntityFetchResult<E extends EntityBase>(
            state: EntitiesStorage,
            { payload: { result } }: PayloadAction<ProvideEntityFetchResultPayload<E>>,
        ) {
            const { locator, version } = result;
            const cache = defineEntityCache(state, locator.entityType);
            const uniqKey = defineUniqIdByLocator(cache, locator);
            const entityState = cache.items[uniqKey];
            if (entityState && entityState.version !== version) {
                return;
            }

            cache.items[uniqKey] = {
                ...entityState,
                version,
                fetchState: 'hasError' in result ? FetchState.Error : FetchState.Idle
            };

            if ('data' in result) {
                cache.items[uniqKey].data = result.data;
                const id = result.data.getId();
                if (id) {
                    cache.uniqKeyByIds[id] = uniqKey;
                }
            }
        },

        setEntityFetchInProgressState<E extends EntityBase>(
            state: EntitiesStorage,
            { payload: { locator } }: PayloadAction<SetEntityFetchInProgressStatePayload<E>>,
        ) {
            const cache = defineEntityCache(state, locator.entityType);
            const uniqKey = defineUniqIdByLocator(cache, locator);
            const entityState = cache.items[uniqKey];

            cache.items[uniqKey] = {
                ...entityState,
                version: (entityState?.version ?? 0) + 1,
                fetchState: FetchState.InProgress
            };
        },

        setListFetchInProgressState<E extends EntityBase>(
            state: EntitiesStorage,
            {
                payload: {
                    locator: { entityType, name }
                }
            }: PayloadAction<SetListFetchInProgressStatePayload<E>>,
        ) {
            const cache = defineEntityCache(state, entityType);
            const listState = cache.lists[name];
            cache.lists[name] = {
                ...listState,
                fetchState: FetchState.InProgress,
                version: (listState?.version ?? 0) + 1,
            };
        },

        provideListFetchResult<E extends EntityBase>(
            state: EntitiesStorage,
            {
                payload: { result },
            }: PayloadAction<ProvideListFetchResultPayload<E>>,
        ) {
            const {
                locator: { name, entityType },
                version,
                shouldCleanBeforeUpdate
            } = result;
            const cache = defineEntityCache(state, entityType);
            let listState = cache.lists[name];

            if (shouldCleanBeforeUpdate && listState?.version !== undefined && listState?.version !== version) {
                return;
            }

            if ('hasError' in result) {
                cache.lists[name] = {
                    ...listState,
                    fetchState: FetchState.Error
                };
                return;
            }

            const {
                cacheLimit,
                segmentSize,
                total,
                segments
            } = result;

            if (!listState?.data || listState.data.segmentSize !== segmentSize || shouldCleanBeforeUpdate) {
                cache.lists[name] = listState = {
                    data: {
                        segments: {},
                        segmentSize,
                        segmentsOrder: [],
                    },
                    version,
                    fetchState: FetchState.Idle
                };
            }

            const listData = listState.data!;
            listData.cacheLimit = cacheLimit;
            listData.total = total;

            Object.keys(segments)
                .sort()
                .forEach(key => {
                    const index = +key;
                    listData.segments[index] = segments[index].map(item => {
                        const id = item.getId();
                        const uniqKey = id && cache.uniqKeyByIds[id] || generateEntityUniqKey();
                        const entityVersion = cache.items[uniqKey]?.version || 1;

                        cache.items[uniqKey] = {
                            data: item,
                            version: entityVersion,
                            fetchState: FetchState.Idle
                        };

                        return uniqKey;
                    });
                    listData.segmentsOrder.push(index);
                });

            while (cacheLimit && listData.segmentsOrder.length > cacheLimit) {
                const i = listData.segmentsOrder.shift();
                delete listData.segments[i!];
            }
        }
    }
});

export const {
    setEntityFetchInProgressState,
    provideEntityFetchResult,
    setListFetchInProgressState,
    provideListFetchResult
} = entitiesSlice.actions;
