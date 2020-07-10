// Imports
import { GraphQLList } from 'graphql'

// App Imports
import UserProductType from './types'
import { getAll, getByUser, get } from './resolvers'

// userproduct by user
export const userproductByUser = {
  type: new GraphQLList(UserProductType),
  resolve: getByUser
}
