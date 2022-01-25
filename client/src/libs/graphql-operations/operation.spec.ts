export const todo = '';

// import { GraphQLClient } from 'graphql-request';
// import { GraphQLOperation, MutationOperation, QueryOperation } from './client';
// import {
//     GraphQLField,
//     GraphQLType
// } from '@shared/entity-meta/graphql/decorators';
// import { GraphQLInt, GraphQLString } from 'graphql';
// import { GraphQLList, GraphQLTypeWrap } from '@shared/entity-meta/graphql/types';

// jest.mock('graphql-request');

// const GraphQLClientMock = <jest.Mock<GraphQLClient>>GraphQLClient;

// @GraphQLType('Simple')
// class SimpleEntity {
//     @GraphQLField(GraphQLString)
//     scalarField!: string;
// }

// @GraphQLType('Extended')
// class ExtendedEntity {
//     @GraphQLField(GraphQLInt)
//     scalarField!: number;

//     @GraphQLField(GraphQLTypeWrap.of(SimpleEntity))
//     link!: SimpleEntity;

//     @GraphQLField(GraphQLList.of(GraphQLTypeWrap.of(SimpleEntity)))
//     linkToList!: Array<SimpleEntity>;
// }


// @QueryOperation('simpleQuery', SimpleEntity)
// class SimpleQuery extends GraphQLOperation<SimpleEntity> {}

// @QueryOperation('extendedQuery', ExtendedEntity)
// class ExtendedQuery extends GraphQLOperation<ExtendedEntity> {}

// @MutationOperation('mutationWithoutBody')
// class MutationWithoutBody extends GraphQLOperation<ExtendedEntity> {}

// describe('GraphQL operations', () => {

//     beforeEach(() => {
//         GraphQLClientMock.mockClear();
//         GraphQLOperation.setDefaultClient(new GraphQLClientMock());
//     });

//     it('should build simple query request', () => {
//         GraphQLOperation.getOperation(SimpleQuery).invoke();
//         expect(GraphQLClientMock.mock.instances[0].request).toHaveBeenCalledWith(
//             'fragment simple on Simple { scalarField } query simpleQuery { simpleQuery{ ...simple } }',
//             undefined,
//         );
//     });

//     it('should build extended query request', () => {
//         GraphQLOperation.getOperation(ExtendedQuery).invoke();
//         expect(GraphQLClientMock.mock.instances[0].request).toHaveBeenCalledWith(
//             'fragment simple on Simple { scalarField } fragment extended on Extended { scalarField link { ...simple } linkToList { ...simple } } query extendedQuery { extendedQuery{ ...extended } }',
//             undefined,
//         );
//     });

//     it('should build mutation without body request', () => {
//         GraphQLOperation.getOperation(MutationWithoutBody).invoke();
//         expect(GraphQLClientMock.mock.instances[0].request).toHaveBeenCalledWith(
//             "mutation mutationWithoutBody { mutationWithoutBody }",
//             undefined,
//         );
//     });

//     it('should create default client only once', () => {
//         GraphQLOperation.getOperation(ExtendedQuery).invoke();
//         GraphQLOperation.getOperation(SimpleQuery).invoke();
//         GraphQLOperation.getOperation(MutationWithoutBody).invoke();
//         expect(GraphQLClientMock).toBeCalledTimes(1);
//     });


//     it('should use custom client if it passed', () => {
//         const client = new GraphQLClientMock();
//         const query = new SimpleQuery(client);

//         query.invoke();

//         expect(GraphQLClientMock.mock.instances[1].request).toHaveBeenCalledWith(
//             'fragment simple on Simple { scalarField } query simpleQuery { simpleQuery{ ...simple } }',
//             undefined,
//         );
//     });
// });
