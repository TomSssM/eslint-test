import { QueryOperation } from '@client-libs/graphql-operations/decorators';
import { GraphQLEntityResultOperation } from '@client-libs/graphql-operations/operation';
import { DashboardEntity } from '@shared/metrika-dto/entities/dashboard';

@QueryOperation('defaultDashboard', DashboardEntity)
export class DashboardRequest extends GraphQLEntityResultOperation<DashboardEntity> {
}
