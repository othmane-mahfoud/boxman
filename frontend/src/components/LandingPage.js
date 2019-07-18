import React from 'react' 
import '../styles/LandingPage.css'
import OrdersTimeline from './OrdersTimeline'
import HomePage from './HomePage'
import Footer from './Footer'
import Navbar from '../containers/Navbar'
import PhoneImg from '../images/phone.png'
  
const LandingPage = (props) => {
    const { currentUser } = props
    if(!currentUser.isAuthenticated){
        return(
            <div className='Homepage'>
                <div className='Homepage-cover'>
                    <Navbar />
                    <div className='Homepage-description'>
                        <p className='Homepage-description-text'>An on demand service that picks-up anything you 
                        requested through the app and delivers it to your door within one hour. </p>
                    </div>
                </div>
                <div className='Homepage-how'>
                    <div className='container'>
                        <div className='Homepage-how-header pt-3'><h1 className='Homepage-how-header-text'>How it Works</h1></div>
                        <div className='Homepage-how-row row pt-5 pb-3'>
                            <div className='col-lg-4 col-md-4 col-sm-6'>
                                <p className='Homepage-how-title'>Request a boxman</p>
                                <p className='Homepage-how-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6'>
                                <p className='Homepage-how-title'>Easy Ordering</p>
                                <p className='Homepage-how-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6'>
                                <p className='Homepage-how-title'>Real time tracking</p>
                                <p className='Homepage-how-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Homepage-download'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-1 col-sm-1'></div>
                            <div className='col-lg-5 col-sm-10'>
                                <div className='Homepage-download-phone'>
                                    <img className='Homepage-download-phone-img' alt='phone' src={PhoneImg}/>
                                </div>
                            </div>
                            <div className='col-lg-5 col-sm-10'>
                                <p className='Homepage-download-text' >Track your deliveries with the Boxman App</p>
                            </div>
                            <div className='col-lg-1 col-sm-1'></div>
                        </div>
                    </div> 
                </div>
                <Footer />
            </div>
        )
    }
    else {
        return(
            <div>
                <Navbar />
                <HomePage currentUser={currentUser} {...props} />
                <Footer />
            </div>
        )
    }
}

export default LandingPage