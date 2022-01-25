import { EntityBase, Id } from '@shared/entity/entity-base';
import { Class } from '@shared/base/class';
import { DataWithFetchState, EntityCache, EntityListState, EntityState, StateWithEntities } from './state';
import { EntityLocator, ListLocator } from './locators';
import { Selector } from 'react-redux';

function getEntityCache<E extends EntityBase>(state: StateWithEntities, entityType: Class<E>): EntityCache<E> | undefined {
    return <EntityCache<E> | undefined>state.entities[EntityBase.getNameByCls(entityType)];
}

export function getEntityStateSelector<E extends EntityBase>(
    locator: EntityLocator<E>,
): Selector<StateWithEntities, EntityState<E> | undefined> {
    return (state: StateWithEntities): EntityState<E> | undefined => {
        const cache = getEntityCache(state, locator.entityType);
        if (!cache) {
            return undefined;
        }

        const uniqId = 'id' in locator ? cache.uniqKeyByIds[locator.id] : cache.aliases[locator.alias];

        return uniqId ? cache.items[uniqId] : undefined;
    };
}

export function getEntitySelector<E extends EntityBase>(
    locator: EntityLocator<E>,
): Selector<StateWithEntities, E | undefined> {
    return (state: StateWithEntities): E | undefined => {
        return getEntityStateSelector(locator)(state)?.data;
    };
}

export function getEntitiesByIds<E extends EntityBase>(
    state: StateWithEntities,
    entityType: Class<E>,
    ids: Array<Id>,
): Record<Id, E> {
    const cache = getEntityCache(state, entityType);

    return cache ? ids.reduce((acc: Record<Id, E>, id: Id) => {
        const uniqId = cache.uniqKeyByIds[id];
        const data = uniqId && cache.items[uniqId]?.data;
        if (data) {
            acc[id] = data;
        }
        return acc;
    }, {}) : {};
}

export function getListState<E extends EntityBase>(state: StateWithEntities, locator: ListLocator<E>): EntityListState | undefined {
    return getEntityCache(state, locator.entityType)?.lists[locator.name];
}

export type FixedListState<E extends EntityBase> = DataWithFetchState<Array<E>>;

export function getFixedListState<E extends EntityBase>(
    state: StateWithEntities,
    entityType: Class<E>,
    name: string,
): FixedListState<E> | undefined {
    // const data = getEntityCache(state, entityType)?.lists[name];
    // if (!data) {
    //
    // }
    throw new Error('unimplenented');
}
