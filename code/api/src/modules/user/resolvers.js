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
  //
  const user = await models.User.findOne({ where: { email } })
  // IF EMAIL DOESNT EXIST USER WILL SET A PASSWORD
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
    // IF EMAIL DOES EXIST THEN USER WILL GET AN ERROR
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

export async function login(parentValue, { email, password }) {
  // LOGGIN IN AS AN EXISTIN USER. IF THE EMAIL DOES NOT EXIST, RENDER ERROR MESSAGE TO SIGN UP. IF IT EXISTS, ENTER PASSWORD
  const user = await models.User.findOne({ where: { email } })

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
// FINDING A USER BY ID, CALLED IN QUERY.JS
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// Get all
// FINDING ALL USERS PROBABLY WHEN ADMIN IS AUTHORIZED
export async function getAll() {
  return await models.User.findAll()
}

// Delete
// DELETE A USER BY ID
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// User genders
// FIND USER GENDER CDALL IN QUERY.JS
export async function getGenders() {
  return Object.values(params.user.gender)
}
