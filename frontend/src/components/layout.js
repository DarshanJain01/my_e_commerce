import React,{useContext} from 'react'
import {RiLayoutGridFill,RiLayoutBottomFill} from 'react-icons/ri'
import {AppContext} from './context'

const Layout = () => {
    const {setLayout,tempData,sort}=useContext(AppContext)
    var length=0

    const calcLength = () => {
        for (let i = 0; i < tempData.length; i++) {
          length+=tempData[i].length
        }
        return length
      };

    return (
        <div className='layout-container'>
        <div className='layoutIcon'>
        <RiLayoutGridFill className='layout' onClick={()=>{localStorage.setItem('lay','false');setLayout(false)}}/> 
        <RiLayoutBottomFill className='layout' onClick={()=>{localStorage.setItem('lay','true');setLayout(true)}}/>
        </div>
        <h3 style={{  color:'#4B5267'}}>{calcLength()} products found</h3>
        <div className='underlinee'></div>
        <div className='sort'>
        <p style={{display:'inline',paddingRight:'3%'}}>Sort By</p>
            <select style={{border:'none',backgroundColor:'#F1F5F8',padding:'3%',fontSize:'0.8rem'}} onChange={(e)=>sort(e.target.value)}>
                <option>Price (Lowest)</option>
                <option>Price (Highest)</option>
                <option>Name (A-Z)</option>
                <option> Name (Z-A)</option>
            </select>
        </div>
        </div>
    )
}

export default Layout
