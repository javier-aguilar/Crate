// Imports
// GraphQL RUNNING FROM THE EXPRESS SERVER
// TESTS OR CHECKS THAT WE ARE PRODUCING THE CORRECT DATA
// CUSTOMIZABLE JSON RESPONSE FROM THE FE THAT ALLOWS US TO CHOOSE WHAT WE WANT, SO INSTEAD OF GETTING EVERY SINGLE PROPERTY IN A LARGE OBJECT, WE ARE GETTING VALUE OF CHOSEN PROPERTIES
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import { UserType, UserLoginType, UserGenderType } from './types'
import { getAll, getById, login, getGenders } from './resolvers'

// All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}

// By ID
// RETURNS A SINGLE USER WHEN YOU PROVIDE IT AN ID
// RELATIVELY IMPORTANT WHEN YOU ARE LOGGED IN, MAYBE WHEN GOING TO PROFILE PAGE IT LOOKS HERE TO KNOW WHAT USER ITS DEALING WITH
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
}

// Auth
// AUTHORIZE A USER TO LOGIN WITH EMAIL AND PASSWORD
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
// GET THE USERS GENDER
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}
