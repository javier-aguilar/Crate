// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import { UserType, UserLoginType, UserGenderType } from './types'
import { getAll, getById, login, getGenders } from './resolvers'

// All
// find all users
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}

// By ID
// finding a specific user by ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
}

// Auth
// authorize a user to login with email and password
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
// get the users gender
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}
