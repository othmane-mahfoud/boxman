import React from 'react'
import jwtDecode from 'jwt-decode'
import { configureStore } from '../store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth'
import '../styles/App.css'
import Homepage from '../components/Homepage'
import Navbar from './Navbar'
import Main from './Main'

const store = configureStore()

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch(e) {
    store.dispatch(setCurrentUser({}))
  }

}

const App = (props) => {
  return (
    <Provider store={store}>
      <Router>
        <div className='onboarding'>
          <Navbar />
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
