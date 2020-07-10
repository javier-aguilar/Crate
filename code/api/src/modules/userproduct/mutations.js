// Imports
import { GraphQLBoolean, GraphQLInt } from 'graphql'

// App Imports
import { UserProductType } from './types'
import { create } from './resolvers'

// Create
export const addUserProduct = {
  type: UserProductType,
  args: {
    userId: {
      name: 'userId',
      type: GraphQLInt
    },

    productId: {
      name: 'productId',
      type: GraphQLInt
    },

    kept: {
      name: 'kept',
      type: GraphQLBoolean
    }
  },
  resolve: create
}
