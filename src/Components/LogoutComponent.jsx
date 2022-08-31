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
    <div className='profileBanner' style={{position:"fixed",background:"#ffffff",height:"43px", width:"100%",zIndex:"3"}}>
        <div className="bannerDiv" style={{position:"relative",width:"100%",margin:"auto",padding:"10px",display:"flex",justifyContent:"right",alignItems:"center",gap:"5px",color:"#5188ad"}}>
          {/* Här ska vara innehåll av något slag, men vet inte vad, dessutom är ovan divs helt fucked. Skit i dom. */}
        </div>
        
    </div>
  )
}

export default LogoutComponent