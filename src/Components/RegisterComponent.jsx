import React, { useState } from 'react'
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../Server/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import standardInput from '../Assets/StandardInput';
import '../Assets/ButtonStyle.css';
import '../Styling/RegisterComponent.css';

const RegisterComponent = () => {
    const [registerFirstname, setRegisterFirstname] = useState(""); 
    const [registerLastname, setRegisterLastname] = useState(""); 
    const [registerEmail, setRegisterEmail] = useState(""); 
    const [registerPassword, setRegisterPassword] = useState(""); 
    const [verRegisterPassword, setVerRegisterPassword] = useState(""); 
    const [errorCode, setErrorCode] = useState(""); 
    const navigate = useNavigate(); 

    const registerOnClick = () =>{
        if(registerPassword == verRegisterPassword){
            registerWithEmail(); 
        }
        else{
            console.log("Password doesn't match."); 
        }
    }

    const registerWithEmail = async () => {
        try{
            const tmpUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword); 
            await setDoc(doc(db, "users", tmpUser.user.uid), {
                firstname: registerFirstname,
                lastname: registerLastname,
                email: registerEmail
                })
            navigate(`/profile/${tmpUser.user.uid}`); 

        } catch (error){
            setErrorCode(error.message); 
            console.log(errorCode); 
        }
    }; 
    
  return (
    <div className='register-form'>
        <div className="register-form-logo-container">
                <img id='register-form-logo' src="/listify-logo.png" alt="" onClick={()=>navigate('/index')}/>
            </div>
        <div className="register-form-bg">
            <div className="register-form-content">
                <h1 style={{marginBottom:"30px"}}>Registrera dig</h1>
                <input style={standardInput} type="text" placeholder='Förnamn' onChange={(event) => {setRegisterFirstname(event.target.value)}}/>
                <input style={standardInput} type="text" placeholder='Efternamn' onChange={(event) => {setRegisterLastname(event.target.value)}}/>
                <input style={standardInput} type="text" placeholder='Epostadress' onChange={(event) => {setRegisterEmail(event.target.value)}}/>
                <input style={standardInput} type="password" placeholder='Lösenord' onChange={(event) => {setRegisterPassword(event.target.value)}}/>
                <input style={standardInput} type="password" placeholder='Verifiera Lösenord' onChange={(event) => {setVerRegisterPassword(event.target.value)}}/>
                <button id='registerBtn' onClick={registerOnClick}>Registrera konto</button>
                <Link id='navigate-link' to={'/login'}>Har du redan ett konto?</Link>
            </div>
        </div>
    </div>
  )
}

export default RegisterComponent