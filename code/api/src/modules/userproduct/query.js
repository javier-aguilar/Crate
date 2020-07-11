// Imports
import { GraphQLList, GraphQLInt } from 'graphql'

// App Imports
import UserProductType from './types'
import { getAll, getByUser, get } from './resolvers'

// userproduct by user
export const userproductByUser = {
  type: new GraphQLList(UserProductType),
  resolve: getByUser
}

// UserProduct All
export const allUserProduct = {
  type: new GraphQLList(UserProductType),
  resolve: getAll
}

// userproduct By id
export const userproduct = {
  type: UserProductType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: get
}
