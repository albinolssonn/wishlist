import React, { useState } from 'react'
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../Server/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import standardInput from '../Assets/StandardInput';
import '../Assets/ButtonStyle.css';

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
    <div className='register-form' style={{height:"100vh",position:"relative",background:"linear-gradient(0deg, rgba(155,88,207,1) 0%, rgba(139,223,203,1) 100%)"}}>
        <div className="register-form-background" style={{width:"350px",height:"600px",background:"#ffffff",borderRadius:"5px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <div className="register-form-content" style={{padding:"40px",textAlign:"center"}}>
                <h1 style={{marginBottom:"30px"}}>Registrera dig</h1>
                <input style={standardInput} type="text" placeholder='Förnamn' onChange={(event) => {setRegisterFirstname(event.target.value)}}/>
                <input style={standardInput} type="text" placeholder='Efternamn' onChange={(event) => {setRegisterLastname(event.target.value)}}/>
                <input style={standardInput} type="text" placeholder='Epostadress' onChange={(event) => {setRegisterEmail(event.target.value)}}/>
                <input style={standardInput} type="password" placeholder='Lösenord' onChange={(event) => {setRegisterPassword(event.target.value)}}/>
                <input style={standardInput} type="password" placeholder='Verifiera Lösenord' onChange={(event) => {setVerRegisterPassword(event.target.value)}}/>
                <button id='registerBtn' onClick={registerOnClick}>Registrera konto</button>
                <Link to={'/login'} style={{textDecoration:"none",color:"#1d1d1d",fontSize:".95rem"}}>Har du redan ett konto?</Link>
            </div>
            

        </div>
        
    </div>
  )
}

export default RegisterComponent