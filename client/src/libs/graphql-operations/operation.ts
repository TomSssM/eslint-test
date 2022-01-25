import { Class } from '@shared/base/class';
import { GraphQLClient } from 'graphql-request';
import { EntityMetadata, getEntityMeta } from '@shared/entity/meta';
import {
    GraphQLEnumWrap,
    GraphQLList,
    GraphQLOptional,
    GraphQLTypeAlias,
    GraphQLTypeWrap
} from '@shared/graphql/field-types';
import { EntityBase } from '@shared/entity/entity-base';
import { OperationKind, OperationMeta } from './meta';
import { getGraphQLArgsMeta } from '@shared/graphql/args';

export interface DynamicListResult<E> {
    items: Array<E>;
    total: number;
}

export abstract class GraphQLOperation<E extends EntityBase, A = undefined> {
    protected readonly request: string;

    public constructor(
        protected client: GraphQLClient,
        protected meta: OperationMeta<E, A>
    ) {
        this.request = this.buildRequest();
    }

    protected getEntityFragmentName({ name }: EntityMetadata): string {
        return `${name[0].toLowerCase()}${name.substr(1)}`;
    }

    protected getFragments(rootEntityMeta: EntityMetadata): Array<string> {
        const fragments: Record<string, string> = {};
        const entities: Array<EntityMetadata> = [rootEntityMeta];

        for (const entity of entities) {
            const name = this.getEntityFragmentName(entity);
            const fields: Array<string> = Object.entries(entity.fieldByName)
                .map(([field, meta]): string => {
                    let { graphQLType } = meta;

                    for (; ;) {
                        if (graphQLType instanceof GraphQLOptional || graphQLType instanceof GraphQLList) {
                            graphQLType = graphQLType.getType();
                        } else if (graphQLType instanceof GraphQLTypeAlias) {
                            graphQLType = graphQLType.getOrigin();
                        } else if (graphQLType instanceof GraphQLTypeWrap) {
                            const fieldEntity = getEntityMeta(graphQLType.getType());
                            const fieldFragmentName = this.getEntityFragmentName(fieldEntity);

                            if (typeof fragments[fieldFragmentName] === 'undefined') {
                                entities.push(fieldEntity);
                                fragments[fieldFragmentName] = '';
                            }

                            return `${field} { ...${fieldFragmentName} }`;
                        } else {
                            return field;
                        }
                    }
                });
            fragments[name] = `fragment ${name} on ${entity.name} { ${fields.join(' ')} }`;
        }

        return Object.values(fragments);
    }

    public getEntityType(): Class<E> | undefined {
        return this.meta.type;
    }

    protected getArgumentsNameWithType(): Record<string, string> | undefined {
        if (!this.meta.args) {
            return undefined;
        }

        const args = getGraphQLArgsMeta(this.meta.args).args;
        if (args.size === 0) {
            return undefined;
        }

        return Array.from(args.entries()).reduce((res: Record<string, string>, [argName, type]) => {
            let graphQLType = type;
            let isRequired = true;
            let strType = '#';
            const withRequired = (t: string): string => `${t}${isRequired ? '!' : ''}`;
            const updateType = (t: string): void => {
                strType = strType.replace('#', withRequired(t));
            };

            for (; ;) {
                if (graphQLType instanceof GraphQLOptional) {
                    isRequired = false;
                    graphQLType = graphQLType.getType();
                } else if (graphQLType instanceof GraphQLList) {
                    updateType('[#]');
                    isRequired = true;
                    graphQLType = graphQLType.getType();
                } else if (graphQLType instanceof GraphQLTypeAlias) {
                    graphQLType = graphQLType.getOrigin();
                } else if (graphQLType instanceof GraphQLTypeWrap) {
                    updateType(getEntityMeta(graphQLType.getType()).name);
                    break;
                } else if (graphQLType instanceof GraphQLEnumWrap) {
                    throw new Error('enum type not supported yet');
                } else {
                    updateType(graphQLType.name);
                    break;
                }
            }
            res[argName] = strType;

            return res;
        }, {});
    }

    protected buildRequest(): string {
        const { type, kind, name } = this.meta;

        const rootEntityMeta = type && getEntityMeta(type);
        const fragments = rootEntityMeta && this.getFragments(rootEntityMeta).join(' ');
        const fields = rootEntityMeta ? `{ ...${this.getEntityFragmentName(rootEntityMeta)} }` : '';

        const args = this.getArgumentsNameWithType();
        let operationHead = name;
        let rootFieldHead = name;
        if (args) {
            const operationParams = Object.entries(args)
                .map(([argName, argType]) => `$${argName} : ${argType}`)
                .join(', ');
            const rootFieldParams = Object.keys(args).map(argName => `${argName} : $${argName}`).join(', ');
            operationHead = `${operationHead}(${operationParams})`;
            rootFieldHead = `${rootFieldHead}(${rootFieldParams})`;
        }

        const body = `${kind === OperationKind.Query ? 'query' : 'mutation'} ${operationHead} { ${rootFieldHead}${fields} }`;

        return fragments ? `${fragments} ${body}` : body;
    }

    protected async fetch(args: A): Promise<unknown> {
        const res: undefined | Record<string, unknown> = await this.client.request(this.request, args);
        if (!res || !res[this.meta.name]) {
            throw new Error('fetch error');
        }
        return res[this.meta.name];
    }

    protected createEntity(data: E): E {
        if (this.meta.type) {
            const res = new this.meta.type();
            Object.entries(data).forEach(([name, val]) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                res[name] = val;
            });
            return res;
        }
        return data;
    }
}

export abstract class GraphQLEntityResultOperation<E extends EntityBase, A = undefined> extends GraphQLOperation<E, A> {

    public async invoke(args: A): Promise<E> {
        const data = <E> (await this.fetch(args));
        return this.createEntity(data);
    }
}

export abstract class GraphQLListResultOperation<E extends EntityBase, A = undefined> extends GraphQLOperation<E, A> {
    public async invoke(args: A): Promise<Array<E>> {
        return (<Array<E>>await this.fetch(args)).map(i => this.createEntity(i));
    }
}

export abstract class GraphQLDynamicListResultOperation<E extends EntityBase, A = undefined> extends GraphQLOperation<E, A> {
    public abstract invoke(offset: number, count: number, args: A): Promise<DynamicListResult<E>>;
}

// function fetchEntity<E, A>(query: OperationMeta<E, A>, args: A): Promise<E> {
//     const meta = Reflect.getMetadata(GRAPHQL_TYPE_META_KEY, query.entity);
//     gql``
// }

//
// type OperationMeta<E, A> = {
//     queryName: string;
//     args: new () => A;
//     entity: new () => E;
// };
//
// // fetch actions
// function fetchEntity<E, A>(query: OperationMeta<E, A>, args: A): Promise<E>;
//
// function fetchEntities<E, A>(query: OperationMeta<E, A>, args: A): Promise<Array<E>>;
//
// // save
// function saveEntity<E>(entity: E): void;
//
// function saveEntities<E>(key: string, entities: Array<E>): void;
// function saveEntities<E>(key: string, entities: Array<E>, index: number, total?: number): void; // предусмотреть режим reset
//
// // selectors
// function getEntity<E>(id: string): E | { isLoading: true } | { error: string };
//
// // fixed
// function getEntities<E>(key: string): { list: Array<E>; isLoading: boolean; error?: string };
//
// // sequential (потенциально можно сделать выгружаемым)
// function getEntities<E>(key: string): { list: Array<E>; total?: number; isLoading: boolean; areAllItemsLoaded: boolean; error?: string };
//
// // pagination
// function getEntities<E>(key: string): { list: Array<E | undefined>; total: number; isLoading: boolean; error?: string };
//
//
// // fixed list
// // total == list.length  + areAllItemsLoaded == true
// // sequential list
// // total == undefined  /  areAllItemsLoaded == true при достижении финального элемента / list.length растет при каждой загрузке
//
// // pagination list
// // total == list.length  / areAllItemsLoaded == true when all list items != undefined / есть пустые элементы isNotLoadedYet
