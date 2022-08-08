import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import WishListComponent from '../Components/WishListComponent';
import VerticalNav from '../Navigation/VerticalNav';
import LogoutComponent from '../Components/LogoutComponent';
import SignedInErrorPage from './SignedInErrorPage';

const WishListProfilePage = ( {userToken} ) => {
    const { id } = useParams(); 

      if(id == userToken){
        return (
          <div style={{background:"#E6E6E6",display:"grid",gridTemplateColumns:"250px 1fr",minHeight:"100vh"}}>
              <div className="navbar">
                  <VerticalNav />
              </div>
      
              <div className="mainContent">
                  <LogoutComponent />
                  <WishListComponent />
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
  


export default WishListProfilePage