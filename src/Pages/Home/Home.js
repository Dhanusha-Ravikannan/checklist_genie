import React from 'react'
import '../Home/Home.css'
import imagess from '../../Assets/logo.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'; 


const Home = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn=()=>{
    navigate('/dashboard');
  }
 
  return (
    <>
  <div className='ggg'> 
  <div className='name'> 
   <img  src={imagess} alt='checklist' className='img'/>
   <h3 className='hom'> <FontAwesomeIcon icon={faHouse}/> Home </h3> 
   <div className='sty'> 
    <div className='genie' > Sign  in to CheckList Genie </div>
    <div className='use'> Welcome user, please sign in to continue</div>
    <pre className='signing' onClick={handleGoogleSignIn}> <FcGoogle  style={{fontSize:'1.7rem'}} />  Sign In With Google</pre>
   </div>
   
    </div>
    </div>
    </>
    
  )
}

export default Home



