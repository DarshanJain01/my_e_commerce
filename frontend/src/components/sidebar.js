import React,{useContext} from 'react'
import {AppContext} from './context'
import {FaTimes} from 'react-icons/fa'
import logo from './logo.svg'
import {IoMdCart} from 'react-icons/io'
import {MdPersonAdd} from 'react-icons/md'
const Sidebar = () => {
    const {isSidebarOpen,setIsSidebarOpen} = useContext(AppContext)
    console.log('sidebar loaded')
    return (
        <div className={isSidebarOpen?' show-sidebar':'sidebar'}>
            <header>
            <img src={logo} alt='not loaded'></img>
            <FaTimes className='cross-icon' onClick={()=>setIsSidebarOpen(!isSidebarOpen)}/>
            </header>
            <div className='services'>
            <a href='/'>Home</a>
            <a href='/about'>About</a>
            <a href='/products'>Products</a>
            </div>
            <div className='iconns'>
            <a href='/cart' ><IoMdCart className='cart-icon' style={{color:'black'}} onClick={()=>setIsSidebarOpen(false)} /></a>
            <MdPersonAdd className='iconn2'/>
            </div>
        </div>
    )
}

export default Sidebar
