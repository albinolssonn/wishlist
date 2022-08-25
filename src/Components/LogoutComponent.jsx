import React, { useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Server/firebase-config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../Assets/ButtonStyle.css';


const LogoutComponent = () => {
    const [user, setUser] = useState({});  
    const [textOppacity, setTextOppacity] = useState(0); 
  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    }); 
  
    
  return (
    <div className='profileBanner' style={{background:"#ffffff",height:"43px"}}>
        <div className="bannerDiv" style={{maxWidth:"auto",margin:"auto",padding:"10px",display:"flex",justifyContent:"right",alignItems:"center",gap:"5px",color:"#5188ad"}}>
          <p style={{transition:"0.2s ease-in", opacity:`${textOppacity}`}}>Inloggad som {user.email} </p>
          <AccountCircleIcon onMouseEnter={()=>setTextOppacity(100)} onMouseLeave={()=>setTextOppacity(0)}/>
        </div>
        
    </div>
  )
}

export default LogoutComponent