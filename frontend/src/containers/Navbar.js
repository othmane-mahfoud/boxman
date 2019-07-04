import React, { Component } from 'react'
import '../styles/Navbar.css'
import { Container, Menu, Modal } from 'semantic-ui-react'
import Authform from '../components/Authform'

class Navbar extends Component {
    render() {
        return (
            <div className='Navbar pt-4 pb-4'>
                <Container>
                    <Menu secondary>
                        <Menu.Menu position='right mr-2'>
                            <Modal className='Navbar-modal' trigger={<button className='Navbar-register btn mr-2'>REGISTER</button>}><Modal.Content><Authform register/></Modal.Content></Modal>
                            <Modal className='Navbar-modal' trigger={<button className='Navbar-login btn mr-2'>LOGIN</button>}><Modal.Content><Authform /></Modal.Content></Modal>
                        </Menu.Menu>
                    </Menu>
                </Container>
            </div>
        )
    }
}

export default Navbar