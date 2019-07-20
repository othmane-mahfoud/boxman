import React, { Component } from 'react'
import OrdersTimeline from './OrdersTimeline'
import Profile from './Profile'
import FAQ from './FAQ'
import '../styles/Homepage.css'

export default class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeNav: 'orders'
        }
    }
    render() {
        const { currentUser, editProfile } = this.props
        const { activeNav } = this.state
        return (
            <div className='HomePage container pt-5'>
                {activeNav==='orders' && (
                    <div className='HomePage-content row'>
                        <div className="sidenav col-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <span onClick={() => {this.setState({activeNav:'orders'})}} className="nav-link-active active" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                    {currentUser.user.role === 'customer' && 'My Orders'}
                                    {currentUser.user.role === 'boxman' && 'To Deliver'}
                                </span>
                                <span onClick={() => {this.setState({activeNav:'profile'})}} className="nav-link" id="v-pills-profile-tab" data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</span>
                                {currentUser.user.role === 'customer' && <span onClick={() => {this.setState({activeNav:'addresses'})}} className="nav-link" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Addresses</span>}
                                {currentUser.user.role === 'boxman' && <span onClick={() => {this.setState({activeNav:'assistance'})}} className="nav-link" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Assistance</span>}
                                <span onClick={() => {this.setState({activeNav:'faq'})}} className="nav-link" id="v-pills-settings-tab" data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false">FAQ</span>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <OrdersTimeline />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeNav==='profile' && (
                    <div className='HomePage-content row'>
                        <div className="sidenav col-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <span onClick={() => {this.setState({activeNav:'orders'})}} className="nav-link" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                    {currentUser.user.role === 'customer' && 'My Orders'}
                                    {currentUser.user.role === 'boxman' && 'To Deliver'}
                                </span>
                                <span onClick={() => {this.setState({activeNav:'profile'})}} className="nav-link-active active" id="v-pills-profile-tab" data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</span>
                                {currentUser.user.role === 'customer' && <span onClick={() => {this.setState({activeNav:'addresses'})}} className="nav-link" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Addresses</span>}
                                {currentUser.user.role === 'boxman' && <span onClick={() => {this.setState({activeNav:'assistance'})}} className="nav-link" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Assistance</span>}
                                <span onClick={() => {this.setState({activeNav:'faq'})}} className="nav-link" id="v-pills-settings-tab" data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false">FAQ</span>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">Orders</div>
                                <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <Profile 
                                        currentUser={currentUser}
                                        editProfile={editProfile}
                                        {...this.props}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeNav==='addresses' && (
                    <div className='HomePage-content row'>
                        <div className="sidenav col-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <span onClick={() => {this.setState({activeNav:'orders'})}} className="nav-link" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                    {currentUser.user.role === 'customer' && 'My Orders'}
                                    {currentUser.user.role === 'boxman' && 'To Deliver'}
                                </span>
                                <span onClick={() => {this.setState({activeNav:'profile'})}} className="nav-link" id="v-pills-profile-tab" data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</span>
                                {currentUser.user.role === 'customer' && <span onClick={() => {this.setState({activeNav:'addresses'})}} className="nav-link-active active" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Addresses</span>}
                                {currentUser.user.role === 'boxman' && <span onClick={() => {this.setState({activeNav:'assistance'})}} className="nav-link" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Assistance</span>}
                                <span onClick={() => {this.setState({activeNav:'faq'})}} className="nav-link" id="v-pills-settings-tab" data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false">FAQ</span>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="tab-content" id="v-pills-tabContent">
                                {currentUser.user.role === 'customer' && <div className="tab-pane fade show active" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">Address</div>}
                            </div>
                        </div>
                    </div>
                )}
                {activeNav==='assistance' && (
                    <div className='HomePage-content row'>
                        <div className="sidenav col-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <span onClick={() => {this.setState({activeNav:'orders'})}} className="nav-link" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                    {currentUser.user.role === 'customer' && 'My Orders'}
                                    {currentUser.user.role === 'boxman' && 'To Deliver'}
                                </span>
                                <span onClick={() => {this.setState({activeNav:'profile'})}} className="nav-link" id="v-pills-profile-tab" data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</span>
                                {currentUser.user.role === 'customer' && <span onClick={() => {this.setState({activeNav:'addresses'})}} className="nav-link" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Addresses</span>}
                                {currentUser.user.role === 'boxman' && <span onClick={() => {this.setState({activeNav:'assistance'})}} className="nav-link-active" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Assistance</span>}
                                <span onClick={() => {this.setState({activeNav:'faq'})}} className="nav-link" id="v-pills-settings-tab" data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false">FAQ</span>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">Orders</div>
                                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">Profile</div>
                                {currentUser.user.role === 'customer' && <div className="tab-pane fade show active" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">Address</div>}
                                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">FAQ</div>
                            </div>
                        </div>
                    </div>
                )}
                {activeNav==='faq' && (
                    <div className='HomePage-content row'>
                        <div className="sidenav col-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <span onClick={() => {this.setState({activeNav:'orders'})}} className="nav-link" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                    {currentUser.user.role === 'customer' && 'My Orders'}
                                    {currentUser.user.role === 'boxman' && 'To Deliver'}
                                </span>
                                <span onClick={() => {this.setState({activeNav:'profile'})}} className="nav-link" id="v-pills-profile-tab" data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</span>
                                {currentUser.user.role === 'customer' && <span onClick={() => {this.setState({activeNav:'addresses'})}} className="nav-link" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Addresses</span>}
                                {currentUser.user.role === 'boxman' && <span onClick={() => {this.setState({activeNav:'assistance'})}} className="nav-link" id="v-pills-messages-tab" data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false">Assistance</span>}
                                <span onClick={() => {this.setState({activeNav:'faq'})}} className="nav-link-active active" id="v-pills-settings-tab" data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false">FAQ</span>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                    <FAQ />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
