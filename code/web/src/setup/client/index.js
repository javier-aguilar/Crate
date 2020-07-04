// Imports
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

// App Imports
import { store } from '../../setup/store'
import { setUser, loginSetUserLocalStorageAndCookie } from '../../modules/user/api/actions'
import ScrollToTop from '../../modules/common/ScrollToTop'
import App from './App'

// User Authentication
const token = window.localStorage.getItem('token')
// MR - IF token IS TRUE AND NOT UNDEFINED, THEN PARSE THE USER OBJECT FROM localStorage
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'))
  // MR - SET THE USER BY RUNNING THE setUser ACTION CREATOR FUNCTION AND UPDATE THE STORE
  if (user) {
    // Dispatch action
    store.dispatch(setUser(token, user))

    // MR - CALL loginSetUserLocalStorageAndCookie(token, user) DECLARED IN '../../modules/user/api/actions' TO SET THE 'TOKEN' & 'USER' TO localStorage
    loginSetUserLocalStorageAndCookie(token, user)
  }
}

// Client App
const Client = () => (
  // MR - BRING IN THE PROVIDER COMPONENT FROM REACT-REDUX LIBRARY AND GIVE IT THE STORE AS A PROPERTY
  <Provider store={store} key="provider">
    <Router>
      <ScrollToTop>
        <App/>
      </ScrollToTop>
    </Router>
  </Provider>
)

// Mount client app
window.onload = () => {
  // MR - hydrate() IS THE SAME AS render(), BUT IS USED TO HYDRATE A CONTAINER WHOSE HTML CONTENTS WERE RENDERED BY ReactDOMServer.
  hydrate(
    <Client/>,
    document.getElementById('app')
  )
}
