// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// Create
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}
// check if an email is already in use, if not, set a password for that email. if it already exists, render error message.
export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })
// logging in as an existing user. if the email does not exist, render error message to sign up. if it exists, enter password. if password incorrect, render error.
  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// Get by ID
// finding a user by ID. Called in query.js
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// Get all
// find all users. Called in query.js
export async function getAll() {
  return await models.User.findAll()
}

// Delete
// delete a user by ID.
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// User genders
// find user gender. Called in query.js
export async function getGenders() {
  return Object.values(params.user.gender)
}
