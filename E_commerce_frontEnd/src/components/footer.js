import React,{useContext} from 'react'
import {AppContext} from './context'
const Footer = () => {
    const {isLoading}=useContext(AppContext)
    return (
        <section className='footer' style={{display:isLoading?'none':''}}>
                <h3 >© 2022 <span style={{color:'#6F3222', margin:'0rem 1rem'}}>ComfySloth</span></h3><h3 >  All rights reserved</h3>
            </section>
    )
}

export default Footer
