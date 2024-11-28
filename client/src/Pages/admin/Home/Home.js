import React from 'react';
import '../../admin/Home/Home.css';
import imagess from '../../../Assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FcGoogle } from "react-icons/fc";

const Home = () => {
  console.log(
    "dddddddddddddddddddddd",
    process.env.REACT_APP_BACKEND_SERVER_URL
  );

  const handleGoogleSignIn = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/google`;
  };
  
  return (
    <>
      <div className='ggg'>
        <div className='name'>
          <img src={imagess} alt='checklist' className='img' />
          <h3 className='hom'><FontAwesomeIcon icon={faHouse} /> Home</h3>
          <div className='sty'>
            <div className='genie'>
              Sign in to CheckList Genie
            </div>
            <div className='use'>Welcome user, please sign in to continue</div>
            <pre className='signing' onClick={handleGoogleSignIn}>
              <FcGoogle style={{ fontSize: '1.7rem' }} /> Sign In With Google
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;






