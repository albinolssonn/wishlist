import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import LogoutComponent from '../Components/LogoutComponent';
import WishListProductComponent from '../Components/WishListProductComponent';
import VerticalNav from '../Navigation/VerticalNav';
import SignedInErrorPage from './SignedInErrorPage';

const SingleWishListPage = ({ loggedInUser }) => {
  const [token, setToken] = useState(""); 

    return (
        <div style={{background:"#E6E6E6",display:"grid",gridTemplateColumns:"250px 1fr",minHeight:"100vh"}}>
          <div className="navbar">
            <VerticalNav />
          </div>
      
          <div className="mainContent">
            <LogoutComponent />
            <WishListProductComponent userToken = {loggedInUser} />
          </div>
        </div> 
        )
        } 
  

export default SingleWishListPage