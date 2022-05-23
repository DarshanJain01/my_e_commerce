import React from 'react'
import {GiDiamondHard,GiCompass} from 'react-icons/gi'
import {RiFilePaper2Line} from 'react-icons/ri'
const Description = () => {
    return (
        <section className='intro3'>
        <article>
            <h1 >Custom Furniture Built Only for You</h1>
            <p style={{color:'#A36348'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Saepe dolorum debitis consectetur reprehenderit non aliquam 
                 voluptates dolore aut vero consequuntur.</p>
        </article>
        <div className='description-container'>
            <div className='description-tabs'><GiDiamondHard className='icon'/><h1>MISSION</h1><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi</p></div>
            <div className='description-tabs'><GiCompass className='icon'/><h1>VISION</h1><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi</p></div>
            <div className='description-tabs'><RiFilePaper2Line className='icon'/><h1>HISTORY</h1><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi</p></div>
        </div>
        </section>
    )
}

export default Description
