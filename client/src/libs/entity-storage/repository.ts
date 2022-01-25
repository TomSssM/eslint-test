import {
    GraphQLDynamicListResultOperation,
    GraphQLListResultOperation,
    GraphQLEntityResultOperation
} from '../graphql-operations/operation';
import { Class } from '@shared/base/class';
import { EntityStorageApi } from './storage';
import { EntityBase } from '@shared/entity/entity-base';
import { EntityLocator, ListLocator } from './locators';
import { FetchListResult } from './fetch-result';
import { FetchState } from './state';

export interface FetchEntitySegmentsOption {
    fromSegmentIndex: number;
    fetchSegmentsCount: number;
    segmentSize: number;
    cacheLimit?: number;
    shouldCleanBeforeUpdate?: boolean;
    shouldRefetchCachedSegments?: boolean;
}

export interface FetchEntityRangeOption {
    from: number;
    to: number;
    segmentSize: number;
    cacheLimit?: number;
    shouldCleanBeforeUpdate?: boolean;
    shouldRefetchCachedSegments?: boolean;
}

export class EntityRepository {

    constructor(private readonly storage: EntityStorageApi) {
    }

    public async fetchEntity<E extends EntityBase, A>(
        locator: EntityLocator<E>,
        operation: GraphQLEntityResultOperation<E, A>,
        args: A,
        shouldRefetch = true
    ): Promise<void> {
        const entityState = this.storage.getEntityState(locator);
        if (!shouldRefetch && entityState) {
            return;
        }

        const { version } = this.storage.setEntityFetchInProgressState(locator);
        try {
            const data = await operation.invoke(args);

            this.storage.provideEntityFetchResult({
                data,
                locator,
                version,
            });
        } catch (e) {
            this.storage.provideEntityFetchResult({
                hasError: true,
                locator,
                version,
            });
            throw e;
        }

        return;
    }

    public async fetchSegments<E extends EntityBase, A>(
        locator: ListLocator<E>,
        operation: GraphQLDynamicListResultOperation<E, A>,
        {
            fromSegmentIndex,
            fetchSegmentsCount,
            segmentSize,
            cacheLimit,
            shouldCleanBeforeUpdate,
            shouldRefetchCachedSegments
        }: FetchEntitySegmentsOption,
        args: A,
    ): Promise<void> {
        let from = fromSegmentIndex;
        let count = fetchSegmentsCount;

        if (!shouldRefetchCachedSegments && !shouldCleanBeforeUpdate) {
            const list = this.storage.getListState(locator);

            if (list?.data) {
                for (let i = 0; i < Math.ceil(fetchSegmentsCount / 2); i++) {
                    if (list.data.segments[from] && (from - fromSegmentIndex === i)) {
                        from++;
                        count--;
                    }
                    if (count && list.data.segments[from + count - 1] &&
                        (fromSegmentIndex + fetchSegmentsCount - (from + count)) === i) {
                        count--;
                    }
                }
            }
        }
        if (count <= 0) {
            return;
        }

        return this.provideListFetchResult(locator, !!shouldCleanBeforeUpdate, async (version: number) => {
            const { items, total } = await operation.invoke(from * segmentSize, count * segmentSize, args);
            const segments: Record<number, Array<E>> = items.reduce((res, item, index) => {
                res[from + Math.floor(index / segmentSize)] = item;
                return res;
            }, {});

            return {
                locator,
                version,
                segmentSize,
                segments,
                shouldCleanBeforeUpdate,
                total,
                cacheLimit,
            };
        });
    }

    public async fetchFixedList<E extends EntityBase, A>(
        locator: ListLocator<E>,
        operation: GraphQLListResultOperation<E, A>,
        args: A,
        shouldRefetch = false
    ): Promise<void> {
        const listState = this.storage.getListState(locator);
        if (!shouldRefetch && listState?.data && listState.fetchState !== FetchState.Error) {
            return;
        }
        return this.provideListFetchResult(locator, true, async (version: number) => {
            const res = await operation.invoke(args);

            return {
                locator,
                version,
                segmentSize: res.length,
                segments: { 0: res },
                shouldCleanBeforeUpdate: true,
                total: res.length
            };
        });
    }

    public fetchRange<E extends EntityBase, A>(
        locator: ListLocator<E>,
        operation: GraphQLDynamicListResultOperation<E, A>,
        {
            from,
            to,
            segmentSize,
            cacheLimit,
            shouldCleanBeforeUpdate,
            shouldRefetchCachedSegments
        }: FetchEntityRangeOption,
        args: A,
    ): Promise<void> {
        return this.fetchSegments(
            locator,
            operation,
            {
                cacheLimit,
                fromSegmentIndex: Math.floor(from / segmentSize),
                fetchSegmentsCount: Math.floor(to / segmentSize) - Math.floor(from / segmentSize) * segmentSize,
                segmentSize,
                shouldCleanBeforeUpdate,
                shouldRefetchCachedSegments
            },
            args,
        );
    }

    public updateEntity<E>(entity: Class<E>): void {

    }

    public updateEntityList(listName: string, ids: Array<string>): void {

    }

    public removeEntity(id: string): void {

    }

    private async provideListFetchResult<E extends EntityBase>(
        locator: ListLocator<E>,
        shouldCleanBeforeUpdate: boolean,
        provideResult: (version: number) => Promise<FetchListResult<E>>,
    ): Promise<void> {
        const { version } = this.storage.setListFetchInProgressState(locator);
        try {
            const res = await provideResult(version);

            this.storage.provideListFetchResult(res);
        } catch (e) {
            this.storage.provideListFetchResult({
                locator,
                version,
                shouldCleanBeforeUpdate,
                hasError: true
            });
        }
    }
}


