import { QueryOperation } from '@client-libs/graphql-operations/decorators';
import { CounterEntity } from '@shared/metrika-dto/entities/counter';
import { CounterQueryArgs } from '@shared/metrika-dto/args/counter';
import { GraphQLEntityResultOperation } from '@client-libs/graphql-operations/operation';

@QueryOperation('counter', CounterEntity, CounterQueryArgs)
export class CounterRequest extends GraphQLEntityResultOperation<CounterEntity, CounterQueryArgs> {}
