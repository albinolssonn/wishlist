import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import standardInput from '../Assets/StandardInput';
import '../Assets/ButtonStyle.css';
import '../Styling/LoginComponent.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Server/firebase-config';

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
        <div className='login-form'>
            <div className="login-form-logo-container">
                <img id='login-form-logo' src="/listify-logo.png" alt="" onClick={()=>navigate('/index')}/> 
            </div>
            <div className="login-form-bg">
                <div className="login-form-content">
                    <h1 id='login-form-title'>Logga in</h1>
                    <input style={standardInput} type="text" placeholder='Epostadress' onChange={(event) => {setLoginEmail(event.target.value)}}/>
                    <input style={standardInput} type="password" placeholder='Lösenord'onChange={(event) => {setLoginPassword(event.target.value)}}/>
                    <div id='login-form-fp-container'>
                        <Link id='login-form-fp' to={"/register"}>Glömt lösenord?</Link>
                    </div>
                    <button id='loginBtn' onClick={signInWithEmail}>Logga in</button>
                    <button id="registerBtn" onClick={()=>navigate("/register")}>Registrera dig</button>
                </div>
            </div>
        </div>
      )
}

export default LoginComponent