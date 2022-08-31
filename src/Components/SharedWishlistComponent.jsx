import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../Server/firebase-config';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StoreIcon from '@mui/icons-material/Store';
import CheckIcon from '@mui/icons-material/Check';

const SharedWishlistComponent = () => {
    const { id, user } = useParams(); 
    const [isLoading, setIsLoading] = useState(false); 
    const [wishlist, setWishlist] = useState([]); 
    const [wishlistOwner, setWishlistOwner] = useState([]); 
    const [products, setProducts] = useState([]); 
    const wlColRef = doc(db, "users", user, "wishlists", id);
    const ownerColRef = doc(db, "users", user);
    const productColRef = collection(db, "users", user, "wishlists", id, "products"); 
    const navigate = useNavigate(); 


    useEffect(() => {
        getWishlist();
        getWishlistOwner(); 
        getProducts(); 
    }, []); 

    const getWishlist = async () => {
        setIsLoading(true);
        const returnData = await getDoc(wlColRef)
        .then((doc) => {
            setWishlist(doc.data(), doc.id);
        })
        setIsLoading(false)
    }; 

    const getWishlistOwner = async () => {
        setIsLoading(true);
        const returnData = await getDoc(ownerColRef)
        .then((doc) => {
            setWishlistOwner(doc.data(), doc.id);
        })
        setIsLoading(false)
    }; 

    const getProducts = async () =>{
        setIsLoading(true)
        const data = await getDocs(productColRef); 
        setIsLoading(false)
        setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    }; 

    const addReserver = async (prodId) => {
        const specProdRef = doc(db, "users", user, "wishlists", id, "products", prodId); 
        await updateDoc(specProdRef, {
            reservable: true
          });
        getProducts(); 
    }; 

    const removeReserver = async (prodId) => {
        const specProdRef = doc(db, "users", user, "wishlists", id, "products", prodId); 
        await updateDoc(specProdRef, {
            reservable: false
            });
        getProducts(); 
    }; 

  return (
    <div className='shared-wl-main'>

        <div className="shared-wl-navigation" style={{height:"60px",background:"white",position:"relative",display:"flex", alignItems:"center"}}>

            <img style={{maxWidth:"110px",margin:"5px 0px 0px 20px"}} src="/listify-logo.png" alt="" />        

            <div className="register-btn-container" style={{position:"absolute", right:"20px"}}>
                <button onClick={()=> {navigate("/register")}}>Gör dina egna listor!</button>
            </div>

        </div>

        <div className="content-holder-1000p" style={{maxWidth:"1000px",margin:"auto",paddingTop:"30px"}}>

            <div className="top-module" style={{background:"white",padding:"10px",borderRadius:"5px", marginBottom:"10px"}}>
                <div className="top-module-title">
                    <h1>{wishlist.name}</h1>
                    <p>En önskelista av {wishlistOwner.firstname} {wishlistOwner.lastname}</p>
                </div>
            </div>

            <div className="wl-product-grid" style={{margin:"auto",display:"grid",gridGap:"10px",gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"}}>
                            
                            {products.map((prod, key)=> {
                                return(
                                    <div key={key} className="wl-product-card-shared" style={{minHeight:"270px",background:"#fff",borderRadius:"5px",position:"relative",transition:"0.2s ease-in"}}>

                                            <div className='wl-product-card-content'>
                                                <div className="wl-product-card-content-img" style={{height:"150px",paddingTop:"10px",display:"flex",alignItems:"center", justifyContent:"center",marginBottom:"8px"}}>
                                                    <img style={{maxWidth:"150px",padding:"10px"}} src={prod.imglink} alt="" />
                                                </div>
                                                <div className="wl-product-card-content-info" style={{padding:"10px"}}>
                                                    <h3 style={{marginBottom:"10px"}}>{prod.name}</h3>
                                                    <p style={{display:"flex", alignItems:"center"}}><MonetizationOnIcon />{prod.price} SEK</p>
                                                    <p style={{display:"flex", alignItems:"center"}}><StoreIcon /> {prod.store}</p>
                                                </div>

                                                {prod.reservable ? <div className="wl-product-card-reserv-div" style={{textAlign:"center",marginBottom:"10px",display:"flex",flexDirection:"column",gap:"5px",alignItems:"center"}}>
                                                    <button onClick={()=>{removeReserver(prod.id)}} id="reserve-btn">Reserverad</button>
                                                    <a style={{width:"100%"}}href={prod.link} target="_blank"><button id="purchase-btn">Köp nu</button></a>

                                                </div>
                                                : 
                                                <div className="wl-product-card-reserv-div" style={{textAlign:"center",marginBottom:"10px",display:"flex",flexDirection:"column",gap:"5px",alignItems:"center"}}>
                                                    <button onClick={()=>{addReserver(prod.id)}} id="reserve-btn">Reservera</button>
                                                    <a style={{width:"100%"}}href={prod.link} target="_blank"><button id="purchase-btn">Köp nu</button></a>
                                                </div>
                                                }

                                            </div>
                                    
                                        
                                    </div>
                                    
                                )
                            })}

                        </div>

        </div>
    </div>
  )
}

export default SharedWishlistComponent