import { EntityBase } from '@shared/entity/entity-base';
import { EntityLocator, ListLocator } from './locators';

export type FetchEntityResult<E extends EntityBase> = {
    locator: EntityLocator<E>;
    version: number;
} & ({
    hasError: boolean;
} | {
    data: E;
});

export type FetchListResult<E extends EntityBase> = {
    locator: ListLocator<E>;
    version: number;
    shouldCleanBeforeUpdate?: boolean;
} & ({
    hasError: boolean;
} | {
    segments: {
        [index: number]: Array<E>;
    };
    segmentSize: number;
    cacheLimit?: number;
    total?: number;
});
