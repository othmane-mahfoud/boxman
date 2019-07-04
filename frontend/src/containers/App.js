import React from 'react'
import '../styles/App.css'
import Homepage from '../components/Homepage'
import Navbar from '../containers/Navbar'

const App = (props) => {
  return (
    <div>
      <Navbar />
      <Homepage />
    </div>
  );
}

export default App;
