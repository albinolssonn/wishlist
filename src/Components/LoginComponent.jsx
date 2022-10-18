import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../Styling/signinComponent.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Server/firebase-config';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const LoginComponent = () => {
    const navigate = useNavigate(); 
    const [loginEmail, setLoginEmail] = useState(""); 
    const [loginPassword, setLoginPassword] = useState(""); 
    const [errorCode, setErrorCode] = useState("") 

    const signInWithEmail = async () => {
        try{
            const tmpUser = await signInWithEmailAndPassword(auth, loginEmail, loginPassword); 
            navigate(`/profile/${tmpUser.user.uid}`);

        } catch (error){
            setErrorCode(error.message);
            console.log(errorCode); 
        }
    }; 

    return (
        <>
        <div className="login-logo-container">
            <img id="signin-logo" src="/listify-logo.png" alt="" onClick={()=>navigate('/index')}/> 
        </div>

        <div className="register-navigation-container">
            <button id='navigate-register-btn' onClick={()=>navigate("/register")}>Don't have an acount?</button> 
        </div>

        <div className='login-section'>
            <div className="login-form-section">
                <div className="login-form">
                    <h3 id='login-form-title'>Sign in</h3>
                    <div className="input-box">
                        <PersonIcon />
                        <input type="text" placeholder='john@email.com' onChange={(event) => {setLoginEmail(event.target.value)}}/>
                    </div>

                    <div className="input-box">
                        <LockIcon />
                        <input type="password" placeholder='Enter your password'onChange={(event) => {setLoginPassword(event.target.value)}}/>
                    </div>  

                    <div id='fp-container'>
                        <Link id='login-form-fp' to={"/register"}>Forgot password?</Link>
                    </div>

                    <div className="signin-btn-container">
                        <button id='loginBtn' onClick={signInWithEmail}>Sign in</button>
                    </div>
                </div>

                <div className="login-widget">
                    <h1>Widget</h1>
                    
                </div>
            </div>
        </div>
        </>
      )
}

export default LoginComponent