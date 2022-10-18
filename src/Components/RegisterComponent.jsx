import React, { useState } from 'react'
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../Server/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../Assets/ButtonStyle.css';
import '../Styling/registerComponent.css';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const RegisterComponent = () => {
    const [registerFirstname, setRegisterFirstname] = useState(""); 
    const [registerLastname, setRegisterLastname] = useState(""); 
    const [registerEmail, setRegisterEmail] = useState(""); 
    const [registerPassword, setRegisterPassword] = useState(""); 
    const [registerPhoneNbr, setRegisterPhoneNbr] = useState(""); 
    const [registerAddress, setRegisterAddress] = useState(""); 
    const [registerCity, setRegisterCity] = useState(""); 
    const [registerZip, setRegisterZip] = useState(""); 
    const [registerCountry, setRegisterCountry] = useState(""); 


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
                first_name: registerFirstname,
                last_name: registerLastname,
                phone_nbr: registerPhoneNbr,
                email_address: registerEmail, 
                billing_address: registerAddress, 
                city: registerCity, 
                zip: registerZip, 
                country: registerCountry

                })
            navigate(`/profile/${tmpUser.user.uid}`); 

        } catch (error){
            setErrorCode(error.message); 
            console.log(errorCode); 
        }
    }; 
    
    return (
        <>
        <div className="register-logo-container">
            <img id="signin-logo" src="/listify-logo.png" alt="" onClick={()=>navigate('/index')}/> 
        </div>

        <div className="register-navigation-container">
            <button id='navigate-login-btn' onClick={()=>navigate("/login")}>Already have an acount?</button> 
        </div>

        <div className='register-section'>
            <div className="register-form-section">
                <div className="register-form">
                    <h3 id='register-form-title'>Sign up!</h3>
                    <div className="input-box">
                        <AlternateEmailIcon />
                        <input type="text" placeholder='john@email.com' onChange={(event) => {setRegisterEmail(event.target.value)}}/>
                    </div>

                    <div className="input-box">
                        <LockIcon />
                        <input type="password" placeholder='Chose your password' onChange={(event) => {setRegisterPassword(event.target.value)}}/>
                    </div> 

                    <div className="input-box">
                        <PersonIcon />
                        <input type="text" placeholder='Fist name' onChange={(event) => {setRegisterFirstname(event.target.value)}}/>
                    </div>

                    <div className="input-box">
                        <PersonIcon />
                        <input type="text" placeholder='Last name' onChange={(event) => {setRegisterLastname(event.target.value)}}/>
                    </div>  

                    <div className="input-box">
                        <PhoneIphoneIcon />
                        <input type="number" placeholder='Phone number' onChange={(event) => {setRegisterPhoneNbr(event.target.value)}}/>
                    </div>

                    <div className="input-box">
                        <LocationOnIcon />
                        <input type="text" placeholder='Address' onChange={(event) => {setRegisterAddress(event.target.value)}}/>
                    </div>  

                    <div className="input-box">
                        <LocationOnIcon />
                        <input type="text" placeholder='Zip' onChange={(event) => {setRegisterZip(event.target.value)}}/>
                    </div>  

                    <div className="input-box">
                        <LocationOnIcon />
                        <input type="text" placeholder='City' onChange={(event) => {setRegisterCity(event.target.value)}}/>
                    </div>

                    <div className="input-box">
                        <LocationOnIcon />
                        <input type="text" placeholder='Country' onChange={(event) => {setRegisterCountry(event.target.value)}}/>
                    </div>

                    <div className="register-btn-container">
                        <button id='registerBtn' onClick={registerWithEmail}> Sign me up!</button>
                    </div>
                </div>

                <div className="register-widget">
                    <h1>Widget</h1>
                </div>
            </div>
        </div>
        </>
        
      )
}

export default RegisterComponent