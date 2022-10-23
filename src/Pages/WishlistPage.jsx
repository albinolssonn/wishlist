import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import WishlistCollectionComponent from '../Components/WishlistCollectionComponent';
import VerticalNav from '../Navigation/VerticalNav';
import SignedInErrorPage from './SignedInErrorPage';
import AdComponent from '../Components/AdComponent';

const WishlistPage = ( {userToken} ) => {
    const { id } = useParams(); 
    const [menuToggle, setMenuToggle] = useState("60px 1fr");         

      if(id == userToken){
        return (
          <>
          <div style={{background:"#f5f5f5",display:"grid",gridTemplateColumns:`${menuToggle}`,minHeight:"100vh"}}>
            <div className="navbar">
              <VerticalNav setGridSize={setMenuToggle}/>
            </div>
      
              <div className="mainContent">
                  <WishlistCollectionComponent />
              </div>
          </div> 
          <AdComponent />
        </>
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