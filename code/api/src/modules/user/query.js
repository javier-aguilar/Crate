// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import { UserType, UserLoginType, UserGenderType } from './types'
import { getAll, getById, login, getGenders } from './resolvers'

// All
// endpoint to get all users
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}

// By ID
// Retuns a single user when provided an ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
}

// Auth
// this is used to log in a user
export const userLogin = {
  type: UserLoginType,
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    },

    role: {
      name: 'role',
      type: GraphQLString
    }
  },
  resolve: login
}

// Genders
// retun the gender of a user
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}
