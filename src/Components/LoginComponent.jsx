import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import standardInput from '../Assets/StandardInput';
import '../Assets/Buttons.css';
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
        <div className='loginDiv' style={{height:"100vh",position:"relative",background:"linear-gradient(0deg, rgba(155,88,207,1) 0%, rgba(139,223,203,1) 100%)"}}>
            <div className="lfbg" style={{width:"350px",height:"600px",background:"#ffffff",borderRadius:"5px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <div className="lf" style={{padding:"40px",textAlign:"center"}}>
                    <h1 style={{marginBottom:"30px"}}>Logga in</h1>
                    <input style={standardInput} type="text" placeholder='Epostadress' onChange={(event) => {setLoginEmail(event.target.value)}}/>
                    <input style={standardInput} type="password" placeholder='Lösenord'onChange={(event) => {setLoginPassword(event.target.value)}}/>
                        <div style={{textAlign:"right",marginBottom:"20px"}}>
                            <Link to={"/register"} style={{textDecoration:"none",color:"#1d1d1d",fontSize:"0.95rem",textAlign:"right"}}>Glömt lösenord?</Link>
                        </div>
                    <button id='loginBtn' onClick={signInWithEmail}>Logga in</button>
                    <button id='registerBtn' onClick={()=>navigate("/register")}>Registrera dig</button>
                </div>
                
    
            </div>
            
        </div>
      )
}

export default LoginComponent