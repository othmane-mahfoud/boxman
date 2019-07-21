import React, {Component} from 'react'
import jwtDecode from 'jwt-decode'
// import io from 'socket.io-client';
import { socket } from '../services/socket'
import { getLocation } from '../services/location'
import { configureStore } from '../store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth'
import '../styles/App.css'
import Navbar from './Navbar'
import Main from './Main'

const store = configureStore()

setInterval(async () => {
  socket.emit("other");
}, 5000);

if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken)
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
    } catch(e) {
        store.dispatch(setCurrentUser({}))
    }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='onboarding'>
            {/* <Navbar /> */}
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
