// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// User type
const UserType = new GraphQLObjectType({
  name: 'user',
  description: 'User type',
// all the fields that can be returned in a GraphQL query for a user type.
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
const UserLoginType = new GraphQLObjectType({
  name: 'userAuth',
  description: 'User Authentication Type',
// identifying an authenticated user
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString }
  })
})

// User Gender type
const UserGenderType = new GraphQLObjectType({
  name: 'userGender',
  description: 'User Gender Type',
// querying by users gender
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

export { UserType, UserLoginType, UserGenderType }
