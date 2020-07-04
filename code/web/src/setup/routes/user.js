// App Imports
import Login from '../../modules/user/Login'
import Signup from '../../modules/user/Signup'
import Profile from '../../modules/user/Profile'
import Subscriptions from '../../modules/user/Subscriptions'

// User routes
export default {
  login: {
    path: '/user/login',
    component: Login
  },
// route to the login page
  signup: {
    path: '/user/signup',
    component: Signup
  },
// route to signup page
  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  },
// route to user profile
  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true
  }
}
// route to user subscriptions
