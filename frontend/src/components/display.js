import React from 'react'

const Display = () => {
    return (
        <section className='intro2'>
                <h1>Featured Products</h1>
                <div className='underline'></div>
                <div className='image-container2'>
                <img alt="9" src='../images/9.jpeg'></img>
                <img  alt="10" src='../images/10.jpeg'></img>
                <img  alt="13" src='../images/13.jpeg'></img>
                </div>
                <form className='back-products' method="get" action="/products">
                     <button className='shop-now' type='submit'>All Products</button> 
                </form>
            </section>
    )
}

export default Display
