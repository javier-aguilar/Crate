// Imports
import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from '../user/types'
import ProductType from '../product/types'

// User type
const UserProductType = new GraphQLObjectType({
  name: 'userproduct',
  description: 'UserProduct type',

  fields: () => ({
    userId: { type: GraphQLInt },
    productId: { type: GraphQLInt },
    kept: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default UserProductType
