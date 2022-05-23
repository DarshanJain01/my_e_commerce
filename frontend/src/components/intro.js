import React from 'react'
import {Link} from 'react-router-dom'

const Intro = () => {
    return (
        <section className='intro'>
        <article className='articl'>
            <h1>Design Your Comfort Zone</h1>
            <p className=''>Hey!! welcome to our e-commerce website. It has been 
               ranked no.1 among other e-commerce websites.We are DELIGHTED by
                your presence on our website.
            </p>
            <Link to='/products'><button className='shop-now'>SHOP NOW</button></Link>
        </article>
    <div className='image-container'>
    <img src='../images/chair.jpeg' alt='home-image2 'className='chair'></img>
    <img src='../images/person.jpeg' alt='s' className='person'></img>
    </div>
    </section>
    )
}

export default Intro
