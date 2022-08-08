import React, { useState } from 'react'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import GroupIcon from '@mui/icons-material/Group';
import InsightsIcon from '@mui/icons-material/Insights';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useNavigate, useParams } from 'react-router-dom';
import '../Navigation/VerticalNav.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Server/firebase-config';


const VerticalNav = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState({});  
    const navigate = useNavigate(); 

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    }); 

    const NavData = [
      {
        title: 'Önskelistor',
        icon: <PlaylistAddCheckIcon/>,
        link: `profile/${user.uid}`
      },
      {
        title: 'Produkter',
        icon: <LocalOfferIcon/>,
        link: ""
      }
      
  ]

    const logout = async () => {
      await signOut(auth)
      navigate('/login')
      localStorage.clear(); 
   };

  return (
    <div className='navbar' style={{background:"#ffffff",height:"100vh",width:"250px",position:"fixed",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      
      <div className="logo__container" style={{padding:"20px 20px 50px 20px",textAlign:"center"}}>
        <h2>Wishlist</h2>
      </div>

      <ul className='navbarList' style={{height:"auto",width:"100%"}}>
        {NavData.map((val, key) => {
          return <li key={key} 
          className="navRow"
          style={{borderRadius:"0px 50px 50px 0px"}} 
          id={window.location.pathname == "/" + val.link ? "active" : ""}
          onClick={()=>navigate("/" + val.link)}> 
            <div id="icon" style={{flex:"30%",display:"grid",placeItems:"center"}}>{val.icon}</div> 
            <div id="title" style={{flex:"70%"}}>{val.title}</div>
          </li>;
        })}
      </ul>
      <li
          className="navRow"
          style={{borderRadius:"0px 50px 50px 0px",position:"absolute",bottom:"20px"}} 
          id={window.location.pathname == "/" ? "active" : ""}
          onClick={logout}> 
            <div id="icon" style={{flex:"30%",display:"grid",placeItems:"center"}}><LogoutIcon /></div> 
            <div id="title" style={{flex:"70%"}}>Logga ut</div>
          </li>;
    </div>
  )
}

export default VerticalNav