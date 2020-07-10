// Imports
import { GraphQLList } from 'graphql'

// App Imports
import UserProductType from './types'
import { getAll, getByUser, get } from './resolvers'

// userProduct by user
export const userProductByUser = {
  type: new GraphQLList(UserProductType),
  resolve: getByUser
}
