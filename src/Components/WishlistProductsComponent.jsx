import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../Server/firebase-config';
import ChangeListNameModal from '../Modals/UpdateWishlistNameModal';
import WishListSettingsModal from '../Modals/WishlistSettingsModal';
import AddProductModal from '../Modals/AddProductModal';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StoreIcon from '@mui/icons-material/Store';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoadingComponent from './LoadingComponent';
import DeleteVerificationModal from '../Modals/RemoveWishlistVerificationModal';
import DeleteIcon from '@mui/icons-material/Delete';


const WishlistProductsComponent = ( { userToken } ) => {
    const navigate = useNavigate(); 
    const user = auth.currentUser;  
    const { id } = useParams(); 
    const [wishList, setWishList] = useState(""); 
    const [products, setProducts] = useState([]); 
    const [nameToggle, setNameToggle] = useState(false); 
    const [addProductModal, setAddProductModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [showSettings, setShowSettings] = useState(false); 
    const [showDeleteVerification, setShowDeleteVerification] = useState(false); 
    const [showProductSettings, setShowProductSettings] = useState(false); 

    useEffect(() => {
        if(user){
            getWishlist();
            getProducts();
        }
        else{
            setIsLoading(true);
        }
        
    }, [user]); 

    const getWishlist = async () => {
        const wishListDocRef = doc(db, "users", user.uid, "wishlists", id); 
        setIsLoading(true);
        const returnData = await getDoc(wishListDocRef)
        .then((doc) => {
            setWishList(doc.data(), doc.id);
        })
        setIsLoading(false)
    }; 

    const removeWishlist = async () => {
        const wishListDocRef = doc(db, "users", user.uid, "wishlists", id); 
        setIsLoading(true)
        await deleteDoc(wishListDocRef);
        setIsLoading(false)
        navigate(`/profile/${userToken}`)
    }    

    const getProducts = async () =>{
        const productColRef = collection(db, "users", user.uid, "wishlists", id, "products"); 
        setIsLoading(true)
        const data = await getDocs(productColRef); 
        setIsLoading(false)
        setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    }; 

    const removeProduct = async (prodId) => {
        const productColRef = doc(db, "users", user.uid, "wishlists", id, "products", prodId); 
        setIsLoading(true); 
        await deleteDoc(productColRef);
        setIsLoading(false); 
        getProducts(); 
    }

    

    if(isLoading){
        return(
            <>
                <LoadingComponent />
            </>
        )
    }else{
        return (
                <div style={{position:"relative"}}>
                        <div className="topModule" style={{maxWidth:"80%",margin:"10px auto",borderRadius:"5px",background:"#ffffff",position:"relative"}}>
                            <div className="topmoduleGrid" style={{padding:"10px",position:"relative"}}>
                            
                            {nameToggle ? <ChangeListNameModal getNewName={getWishlist} userID={userToken} openModal={setNameToggle}/> : 
        
                                <div className="topModuleContent" style={{display:"flex",alignItems:"center"}}>
                                        <div className="wlTitle" style={{marginRight:"5px"}}>
                                            <h1>{wishList.name}</h1>
                                        </div>

                                        <div className="removeWLBtn" onClick={()=> setShowSettings(true)}>
                                            <MoreVertIcon style={{fontSize:"1.5rem",color:"#a3b9cd",marginTop:"5.5px"}}/>
                                        </div>
                                </div>

                            }
                            </div>
                            {showSettings && <WishListSettingsModal 
                                deleteVerification={setShowDeleteVerification} 
                                showSettings={setShowSettings} 
                                openNameChange={setNameToggle}
                            />}

                            {showDeleteVerification && <DeleteVerificationModal 
                            deleteVerification={setShowDeleteVerification} 
                            removeWishlist={removeWishlist}
                            />}
                        </div>   

        
                        {addProductModal && <AddProductModal openModal={setAddProductModal} updateProducts={getProducts} userID={userToken}/>}
        
                        <div className="wl-product-grid" style={{maxWidth:"80%",margin:"auto",display:"grid",gridGap:"10px",gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"}}>
                            <div className="wl-product-grid-add-btn" onClick={()=>setAddProductModal(true)} style={{minHeight:"270px",background:"white",borderRadius:"5px",position:"relative",transition:"0.2s ease-in",background:"linear-gradient(0deg, rgba(104,179,211,1) 0%, rgba(126,207,88,1) 100%)",display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                                <div className="wl-product-grid-add-btn-content" style={{textAlign:"center",color:"white"}}>
                                    <AddCircleIcon style={{fontSize:"60px"}}/>
                                    <p>Lägg till produkt</p>
                                </div>
                                
                            </div>
                            {products.map((prod, key)=> {
                                return(
                                    <div key={key} className="wl-product-card" style={{minHeight:"270px",background:"#fff",borderRadius:"5px",position:"relative",transition:"0.2s ease-in"}}>
                                        <div className="wl-product-card-remove-btn">
                                            <DeleteIcon style={{fontSize:"1.1rem"}} onClick={()=> removeProduct(prod.id)}/>
                                        </div>
                                        
                                        <a target="_blank" href={prod.link}>
                                            <div className='wl-product-card-content'>
                                                <div className="wl-product-card-content-img" style={{height:"150px",paddingTop:"10px",display:"flex",alignItems:"center", justifyContent:"center",marginBottom:"8px"}}>
                                                    <img style={{maxWidth:"150px",padding:"10px"}} src={prod.imglink} alt="" />
                                                </div>
                                                <div className="wl-product-card-content-info" style={{padding:"10px"}}>
                                                    <h3 style={{marginBottom:"10px"}}>{prod.name}</h3>
                                                    <p style={{display:"flex", alignItems:"center"}}><MonetizationOnIcon />{prod.price} SEK</p>
                                                    <p style={{display:"flex", alignItems:"center"}}><StoreIcon /> {prod.store}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    
                                )
                            })}

                        </div>

                        
                    </div>
                
          )

    }

  
}

export default WishlistProductsComponent