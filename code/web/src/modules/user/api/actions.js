// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'

// Actions
// Set a user after login or using localStorage token

// MR - setUser(token, user) is our Action Creator
  // MR - taking IN: info [token, user] RETURNING: Action Object {type & payload}
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  // MR - long-hand example w/ 'payload key' { type: SET_USER, payload: user }
  return { type: SET_USER, user }
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    // MR - RUNS DISPATCH FUNCTION => SENDING INFO TO CORRECT REDUCER MATCHING THE TYPE: LOGIN_REQUEST
    // MR - OUR PAYLOAD 'isLoading' IS EQUAL TO TRUE (set in the paramaters)
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })

    // MR - using Axios to “post” data to the routeApi endpoint. This endpoint may then use this POST request to perform a certain task or trigger an event.
    // MR - This method requires two parameters. 1) it needs the URL of the service endpoint. 2) an object which contains the properties that we want to send to our server
    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))

      // SET REQUEST RESPONSE TO AN ERROR WITH A VALUE OF ''
      .then(response => {
        let error = ''

        // MR - IF THE RESPONSE ERROR DOES NOT REMAIN UNDEFINED, THEN THE ERROR VARIABLE IS SET TO AN ERROR MSG
        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message

        // MR - ELSE IF THE userLogin TOKEN IS DEFINED (bc the error variable is set to its default value of undefined), ASSIGN TOKEN A VALUE
        // MR - AND ASSIGN THE USER A SPECIFIC USER, THEN DISPATCH THE ACTION ON LINE 64...
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user

          // MR - RUNS DISPATCH FUNCTION => SENDING ACTION OBJ {TYPE: SET_USER, user} TO THE CORRECT REDUCER (MATCHING ITS case 'SET_USER' BY PASSING IN setUser() SINCE IT RETURNS ACTION OBJECT)
          dispatch(setUser(token, user))

          // MR - CALLS LOCAL STORAGE FUNCTION IN THIS FILE...
          loginSetUserLocalStorageAndCookie(token, user)
        }

        // WITHIN THE FIRST 'if' CONDITION, IF THE ERROR MSG HAS A DEFINED VALUE, THEN SEND THAT DEFINED ERROR VALUE WITH DISPATCH FUNCTION
        // MR - RUN DISPATCH FUNCTION => SENDING ACTION OBJ WITH {TYPE: LOGIN_RESPONSE & PAYLOAD: ERROR} TO REDUCER CASE 'LOGIN_RESPONSE'
        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })

      // MR - IF THE POST FAILS THE CATCH WILL DISPLAY THE ERROR BELOW
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
// MR - SETS THE localStorage KEY 'TOKEN' TO token & 'USER' to user AND SETS THE COOKIE FOR SSR ASWELL
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}
