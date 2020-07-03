// App Imports
import Login from '../../modules/user/Login'
import Signup from '../../modules/user/Signup'
import Profile from '../../modules/user/Profile'
import Subscriptions from '../../modules/user/Subscriptions'

// User routes
// this defines the routes of all buttons/links for users
export default {
  // login page
  login: {
    path: '/user/login',
    component: Login
  },

  // user signup page
  signup: {
    path: '/user/signup',
    component: Signup
  },

  // user profile page (we will need to add edits and stuff here)
  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  },

  // we will add an edit profile route here

  // we will add an item history route here

  // user subscriptions page
  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true
  }
}
