import React from 'react'

const SignUp = () => {
    return (
        <section className='sign-up'>
                <h1>Join Our Newsletter And Get 20% Off</h1>
                <div className='signUp-container'>
                <p style={{color:'#88ADD1'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Placeat sint unde quaerat ratione soluta 
                    veniam provident adipisci cumque eveniet tempore?</p>
                <div className='input-container'>
                    <input  placeholder='Enter E-Mail' type='text'></input>
                    <button className='subscribe-now'>Subscribe</button>
                </div>
                </div>
            </section>
    )
}

export default SignUp
