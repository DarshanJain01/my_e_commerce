import React,{useContext} from 'react'
import logo from './logo.svg'
import {IoMdCart} from 'react-icons/io'
import {MdPersonAdd} from 'react-icons/md'
import {FaBars} from 'react-icons/fa'
import {AppContext} from './context'
  import {Link} from 'react-router-dom'
const Navigation = () => {
    const {isSidebarOpen,setIsSidebarOpen} = useContext(AppContext)
   
        
    return (
        <div className='navigation'>
            <img alt="logo" className='logo' src={logo}></img>
            <FaBars className='faBar-icon' onClick={()=>setIsSidebarOpen(!isSidebarOpen)}/>
            <ul className='nav'>
                <li><Link to='/' className='navi'> Home</Link></li>
                <li><Link to='/about' className='navi'> About</Link></li> 
               <li><Link to='/products' className='navi'> Products</Link></li>      
             </ul>
        
            <div className='log-cart-icon'>
                   <Link to='/cart' style={{color:'black'}}><IoMdCart className='cart-icon' /></Link>
                    <MdPersonAdd className='login-icon' />
            </div>
        </div>
    )
}

export default Navigation
