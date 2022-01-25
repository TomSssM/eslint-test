import { EntityBase } from '@shared/entity/entity-base';
import { OperationKind, OperationMeta } from './meta';
import { GraphQLClient } from 'graphql-request';
import { Class } from '@shared/base/class';
import { OPERATION_META_KEY } from './decorators';
import {
    GraphQLDynamicListResultOperation,
    GraphQLEntityResultOperation,
    GraphQLListResultOperation, GraphQLOperation
} from './operation';

export class GraphQLManager {

    private operations: Record<OperationKind, Record<string, GraphQLOperation<EntityBase, unknown>>> = {
        [OperationKind.Query]: {},
        [OperationKind.Mutation]: {}
    };

    constructor(
        private client: GraphQLClient
    ) {
    }

    public getEntityOperation<E extends EntityBase, A>(
        operation: Class<GraphQLEntityResultOperation<E, A>>
    ): GraphQLEntityResultOperation<E, A> {
        return <GraphQLEntityResultOperation<E, A>>this.getOperation(operation);
    }

    public getListOperation<E extends EntityBase, A>(operation: Class<GraphQLListResultOperation<E, A>>): GraphQLListResultOperation<E, A> {
        return <GraphQLListResultOperation<E, A>>this.getOperation(operation);
    }

    public getDynamicListOperation<E extends EntityBase, A>(
        operation: Class<GraphQLDynamicListResultOperation<E, A>>
    ): GraphQLDynamicListResultOperation<E, A> {
        return <GraphQLDynamicListResultOperation<E, A>>this.getOperation(operation);
    }

    private getOperationMeta<E extends EntityBase, A>(
        // eslint-disable-next-line @typescript-eslint/ban-types
        operation: Class<GraphQLOperation<E, A>> | Function
    ): OperationMeta<E, A> {
        const meta = <OperationMeta<E, A>>Reflect.getMetadata(OPERATION_META_KEY, operation);
        if (!meta) {
            throw new Error('invalid operation type');
        }
        return meta;
    }

    private getOperation<E extends EntityBase, A>(
        operation: new (client: GraphQLClient, meta: OperationMeta<E, A>) => GraphQLOperation<E, A>
    ): GraphQLOperation<E, A> {
        const meta = this.getOperationMeta(operation);
        const ops = this.operations[meta.kind];
        if (!ops[meta.name]) {
            ops[meta.name] = new operation(this.client, meta);
        }
        return <GraphQLOperation<E, A>>ops[meta.name];
    }

}
