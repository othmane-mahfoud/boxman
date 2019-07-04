import React from 'react' 
import '../styles/Homepage.css'
import HomepageFeature from './HomepageFeature'
import SuperMarketImg from '../images/groceries.png'
import ShopImg from '../images/price-tag.png'
import CourierImg from '../images/delivery-man.png'
import AnythingImg from '../images/magic-wand.png'
import SelfcareImg from '../images/sun-lotion.png'
import FoodImg from '../images/burger.png'
  
const Homepage = () => {
    const features = [
        {name: 'Supermarket', picture: SuperMarketImg},
        {name: 'Shop', picture: ShopImg},
        {name: 'Courier', picture: CourierImg},
        {name: 'Anything', picture: AnythingImg},
        {name: 'Self Care', picture: SelfcareImg},
        {name: 'Food', picture: FoodImg}
    ]
    const featuresList = features.map(f => (
        <HomepageFeature name={f.name} picture={f.picture}/>
    ))
    return (
        <div className='Homepage'>
            <div className='container pt-5'>
                <h1 className='Homepage-header'>BoxMan <i class="fa fa-map-marker" /></h1>
                <p className='Homepage-text'>Anything you want<br/>delivered in minutes</p>
                <div className='row'>
                    {featuresList}
                </div>
            </div>
            <p className='Homepage-quote mt-5'><em>"The order is on you, the delivery is on us."</em></p>
        </div>
    ) 
}

export default Homepage