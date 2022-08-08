import React, { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Server/firebase-config';
import LoginIcon from '@mui/icons-material/Login';
import '../Assets/Buttons.css';


const SignedOutErrorPage = () => {

    const navigate = useNavigate();   

    const backToSignIn = () => {
        navigate("/login")
      }

  return (
    <div className='loginDiv' style={{height:"100vh",position:"relative",background:"#ffffff",textAlign:"center"}}>
            <div className="lfbg" style={{width:"500px",height:"500px",background:"linear-gradient(0deg, rgba(155,88,207,1) 0%, rgba(139,223,203,1) 100%)",borderRadius:"23% 77% 81% 19% / 82% 46% 54% 18%",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <div className="lf" style={{padding:"40px",color:"#1d1d1d",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>
                  <h1 style={{fontSize:"63px",marginBottom:"10px"}}>Hoppsan...</h1>
                  <p style={{fontSize:"1.1rem"}}>Du måste vara inloggad för att se detta innehåll.</p>
                  <button id="errorBtn" onClick={backToSignIn}><LoginIcon /><p style={{marginLeft:"5px"}}>Logga in</p></button>
                </div>
            </div>
        </div>
  )
}

export default SignedOutErrorPage