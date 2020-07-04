// Imports
import { compose, combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

// App Imports
import common from '../modules/common/api/state'
// MR - IMPORTING USER REDUCER
import user from '../modules/user/api/state'
import * as product from '../modules/product/api/state'
import * as subscription from '../modules/subscription/api/state'
import * as crate from '../modules/crate/api/state'

// App Reducer
const appReducer = combineReducers({
  common,
  user,
  ...product,
  ...subscription,
  ...crate
})

// Root Reducer
// MR - rootReducer IS ALL OF OUR COMPONENT SPECIFIC REDUCERS PACKAGED UP INTO A SINGLE OBJECT WHEN THE appReducer() FUNCTION IS CALLED HERE
export const rootReducer = (state, action) => {
  // MR - IF THE ACTION PASSED THROUGH WITH createStore HAS A TYPE VALUE OF 'RESET' (THIS WOULD HAVE BEEN GIVEN THE 'RESET' TYPE IN THE 'src/setup/server/load-routes.js' FILE), THEN SET STATE TO 'UNDEFINED'.
  if (action.type === 'RESET') {
    state = undefined
  }

  // MR - OTHERWISE (IF THE ACTION'S TYPE HAS A VALUE SET IN ONE OUR REDUDUCERS), THEN RUN THE appReducer() FUNCTION IN THIS FILE TO combineReducers() FUNCTION TO CREATE OUR GLOBAL STORE.
  return appReducer(state, action)
}

// Load initial state from server side
let initialState
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}

// Store
// MR - createStore IS A FUNCTION FROM Redux THAT TAKES IN: THE rootReducer WE CREATED TO CREATE OUR GLOBAL STORE
// MR - ( optionally it takes in another parameter to connect our app to the Redux dev tools in Chrome. )
export const store = createStore(
  // MR - IF rootReducer RETURN AN UNDEFINED STATE THEN THIS createStore FUNCTION WILL DO SO WITH initialState SET IN THE SERVER.
  rootReducer,
  initialState,

  compose(
    applyMiddleware(thunk),
  )
)
