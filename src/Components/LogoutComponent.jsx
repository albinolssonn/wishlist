import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Server/firebase-config';
import LogoutIcon from '@mui/icons-material/Logout';
import '../Assets/Buttons.css';


const LogoutComponent = () => {
    const [user, setUser] = useState({});  
  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    }); 
  
    
  return (
    <div className='profileBanner' style={{background:"#ffffff",height:"43px"}}>
        <div className="bannerDiv" style={{maxWidth:"auto",margin:"auto",padding:"10px",textAlign:"right"}}>
          <p>{user.email}, {user.uid} </p>
        </div>
        
    </div>
  )
}

export default LogoutComponent