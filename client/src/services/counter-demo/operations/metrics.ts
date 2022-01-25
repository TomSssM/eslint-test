import { GraphQLListResultOperation } from '@client-libs/graphql-operations/operation';
import { MetricsEntity } from '@shared/metrika-dto/entities/metrics';
import { QueryOperation } from '@client-libs/graphql-operations/decorators';
import { MetricsSetArgs } from '@shared/metrika-dto/args/metrics';

@QueryOperation('metricsSet', MetricsEntity, MetricsSetArgs)
export class MetricsSetRequest extends GraphQLListResultOperation<MetricsEntity, MetricsSetArgs> {}
