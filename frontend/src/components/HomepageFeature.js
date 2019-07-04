import React from 'react'
import '../styles/HomepageFeature.css'

const HomepageFeature = (props) => (
    <div className='col-6 col-sm-6 col-md-4 col-lg-2'>
        <div className="HomepageFeature card rounded-circle">
            <img src={props.picture} className="HomepageFeature-img card-img-top mt-2" alt="..." />
            <div className="card-body">
                <p class="card-text">{props.name}</p>
            </div>
        </div>
    </div>
)

export default HomepageFeature