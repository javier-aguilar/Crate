// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// User type
const UserType = new GraphQLObjectType({
  name: 'user',
  description: 'User type',

  // TELLING US THE DATA TYPE IN GraphQLInt IF YOU WANT TO QUERY IT
  // IMPORTANT WHEN WE ARE LOOKING FOR A USER ADDRESS, WE WOULD NEED TO UPDATE THE USER FIELD TO ACCEPT AN ADDRESS PROPERTY
  // BACKEND WOULD NEED TO CREATE A MIGRATION AND WRITE A METHOD, AND RESOLVER
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

// User Login type
//
const UserLoginType = new GraphQLObjectType({
  name: 'userAuth',
  description: 'User Authentication Type',

  fields: () => ({
    user: { type: UserType },
    // ONCE THEY LOG IN A USER GETS A TOKEN AUTHORIZING THEM AS AN ADMIN OR A USER
    token: { type: GraphQLString }
  })
})

// User Gender type
// QUERYING BY A USERS SPECIFIED GENDER
const UserGenderType = new GraphQLObjectType({
  name: 'userGender',
  description: 'User Gender Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

export { UserType, UserLoginType, UserGenderType }
