import React from 'react'
import { Menu } from 'semantic-ui-react'
import '../styles/Footer.css'

const Footer = () => (
    <div className='Footer'>
        <div className='container'>
            <Menu secondary>
                <div className='Footer-brand-name'>Boxman <i className="Footer-brand-logo fa fa-shopping-bag"/></div>
                <Menu.Menu position='right' className='mr-2 pt-2'>
                    <ul className='Footer-link-list'>
                        <li className='Footer-list-item'>About</li>
                        <li className='Footer-list-item'>Terms</li>
                        <li className='Footer-list-item'>Privacy Policy</li>
                    </ul>
                </Menu.Menu>
            </Menu>
        </div>
    </div>
)

export default Footer