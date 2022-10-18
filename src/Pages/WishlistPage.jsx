import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import WishlistCollectionComponent from '../Components/WishlistCollectionComponent';
import VerticalNav from '../Navigation/VerticalNav';
import LogoutComponent from '../Components/LogoutComponent';
import SignedInErrorPage from './SignedInErrorPage';

const WishlistPage = ( {userToken} ) => {
    const { id } = useParams(); 
    const [menuToggle, setMenuToggle] = useState("60px 1fr");         

      if(id == userToken){
        return (
          <div style={{background:"#f5f5f5",display:"grid",gridTemplateColumns:`${menuToggle}`,minHeight:"100vh"}}>
            <div className="navbar">
              <VerticalNav setGridSize={setMenuToggle}/>
            </div>
      
              <div className="mainContent">
                  <LogoutComponent />
                  <WishlistCollectionComponent />
              </div>
          </div> 
        )
        } 
        else{
          return(
            <div className="404Div">
              <SignedInErrorPage />
            </div>
          )
        } 
    }
  


export default WishlistPage