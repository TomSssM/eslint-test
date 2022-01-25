import { Class } from '@shared/base/class';
import { ClassDecoratorTarget } from '@shared/base/decorator';
import { OperationKind, OperationMeta } from './meta';

export const OPERATION_META_KEY = 'OPERATION_META_KEY';

export function QueryOperation<E, A = undefined>(name: string, type: Class<E>, args?: Class<A>): ClassDecorator {
    return getOperationDecorator<E, A>(OperationKind.Query, name, type, args);
}

export function MutationOperation<E, A = undefined>(name: string, type?: Class<E>, args?: Class<A>): ClassDecorator {
    return getOperationDecorator<E, A>(OperationKind.Mutation, name, type, args);
}

function getOperationDecorator<E, A>(kind: OperationKind, name: string, type?: Class<E>, args?: Class<A>): ClassDecorator {
    return <T extends ClassDecoratorTarget>(target: T): T | void => {
        const meta: OperationMeta<E, A> = {
            name,
            kind,
            args,
            type
        };
        Reflect.defineMetadata(OPERATION_META_KEY, meta, target);
        return target;
    };
}
