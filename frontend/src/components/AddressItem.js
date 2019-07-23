import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import '../styles/AddressItem.css'

export default class AddressItem extends Component {
    render() {
        return (
            <div className='AddressItem mt-2'>
                <div className='card'>
                    <div className='card-header'>
                        Address #{this.props.index + 1}
                        <Icon className='trashIcon' name='trash alternate outline' onClick={this.props.removeAddress}/>
                    </div>
                    <div className='card-body'>
                        <Icon name='map marker alternate'/>
                        {this.props.address}
                    </div>
                </div> 
            </div>
        )
    }
}
