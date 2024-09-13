import React from 'react'
import '../Home/Home.css'
import imagess from '../../Assets/logo.jpg'
import {useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {faHouse} from '@fortawesome/free-solid-svg-icons'



const Home = () => {
const navigate= useNavigate();
const google=()=>{
  navigate('Dashboard')
}

  return (
    <>
  <div className='name'> 
   <img  src={imagess} alt='checklist' className='img'/>
   <h3 className='home' > <FontAwesomeIcon icon={faHouse}/> Home </h3> 
  </div>
  <div className='color'> 
  
    <div className='log'> LOGIN </div>
    <div className='sign'  onClick={google}> <FontAwesomeIcon icon={faGoogle} className='icon' style={{marginTop:'0.3rem'}} />  Sign in with Google</div>

  
    </div>
    
    
    </>
    
  )
}

export default Home
