// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
// MR - THE action ARGUMENT IS COMING IN FROM THE USER ACTIONS FILE SPECIFIC TO ITS actionCreator
// MR - REDUCER THAT CONTROLS THE USER PIECE OF STORE, WHICH IS THEN COMBINED TOGETHER WITH THE OTHER COMPONENTS REDUCERS INTO THE 'rootReducer' WHICH WE USE TO CREATE OUR APPLICATIONS GLOBAL STORE
// MR - TAKES IN: INITIAL/DEFAULT STATE VALUE & THE ACTION SENT BY THE actionCreator via THE Dispatch FUNCTION
export default (state = userInitialState, action) => {

  // MR - switch RUNS THE CASE BASED ON THE VALUE OF OUR action objects's TYPE PROPERTY
  switch (action.type) {
    case SET_USER:
      return {
        // MR - THE DEFAULT STATE SET IN THE PARAMATER AS userInitialState TO THE rootReducer IN store.js FILE
        ...state,
        // MR - isAuthenticated BECOMES THE OPOSITE OF ITS INITIAL STATE VALUE, SO 'TRUE'
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
      }

    case LOGIN_REQUEST:
      return {
        // MR - THE DEFAULT STATE SENT TO THE rootReducer IN store.js FILE
        ...state,
        error: null,
        isLoading: action.isLoading
      }

    case LOGIN_RESPONSE:
      return {
        // MR - THE DEFAULT STATE SENT TO THE rootReducer IN store.js FILE
        ...state,
        error: action.error,
        isLoading: false
      }

    case LOGOUT:
      return {
        // MR - THE DEFAULT STATE SENT TO THE rootReducer IN store.js FILE
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

    // MR - IF NO CASE IS MATCHED, THEN THIS REDUCER RETURNS THE DEFAULT STATE, WHICH IS SENT TO THE rootReducer IN store.js FILE
    default:
      return state
  }
}
