import { Class } from '@shared/base/class';

export enum OperationKind {
    Query = 'Query',
    Mutation = 'Mutation'
}

export interface OperationMeta<E, A = undefined> {
    name: string;
    kind: OperationKind;
    args?: Class<A>;
    type?: Class<E>;
}

