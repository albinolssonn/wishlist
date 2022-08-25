import React from 'react'
import spinner from '../Images/SpinnerWishList.png';
import '../Assets/SpinnerStyle.css';


const LoadingComponent = () => {
  return (
    <div className="spinnerBG" style={{height:"90%",position:"relative"}}>
        <div className="spinner-content" style={{height:"100%",textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <img id='loading-spinner' src={spinner} alt="" style={{width:"100px",marginBottom:"10px"}} />
            <h3>Hämtar innehåll...</h3>
        </div>

    </div>
    
    
                

        
    
  )
}

export default LoadingComponent