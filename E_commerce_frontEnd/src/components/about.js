import React from 'react'
import {Link} from 'react-router-dom'

const About = () => {
    return (
        <div>
            <div className='home-navi '>
             <p ><Link to='/' className='link'>Home</Link>/About</p>
           </div>
           <div className='intro'>
               <img src='../images/1.jpeg'  alt='imag' style={{width:'100%',height:'95%'}} />
                <article className='articl'>
                     <h1 style={{fontSize:'2.5rem'}}>Our Story</h1>
                     <div className='underlinee' style={{marginTop:'0'}}></div>
                        <p className='desci'>Hey!! welcome to our e-commerce website. It has been 
                            ranked no.1 among other e-commerce websites.We are DELIGHTED by
                            your presence on our website.
                        </p>
                    </article>
           </div>
        </div>
    )
}

export default About
