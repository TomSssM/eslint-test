import { EntityBase, Id } from '@shared/entity/entity-base';
import { Class } from '@shared/base/class';

export type EntityLocator<E extends EntityBase> = {
    entityType: Class<E>;
} & ({ id: Id } | { alias: string });

export interface ListLocator<E extends EntityBase> {
    entityType: Class<E>;
    name: string;
}
