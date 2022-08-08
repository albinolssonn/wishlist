import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../Server/firebase-config';
import ChangeListNameModal from '../Modals/ChangeListNameModal';
import AddProductModal from '../Modals/AddProductModal';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StoreIcon from '@mui/icons-material/Store';
import EditIcon from '@mui/icons-material/Edit';
import { onAuthStateChanged } from 'firebase/auth';



const WishListProductComponent = ( { userToken } ) => {
    const { id } = useParams(); 
    const [wishList, setWishList] = useState(""); 
    const [products, setProducts] = useState([]); 
    const [nameToggle, setNameToggle] = useState(false); 
    const [addProductModal, setAddProductModal] = useState(false);
    const navigate = useNavigate(); 
    const [user, setUser] = useState({});  
  
    

    useEffect(() => {
        getWishList();
        getProducts(); 
    }, []); 


    // Här är en major bugg när man uppdaterar sidan, titta på det senare

    const getWishList = async () => {
        const wishListDocRef = doc(db, "users", userToken, "wishlists", id); 
        const returnData = await getDoc(wishListDocRef)
        .then((doc) => {
            setWishList(doc.data(), doc.id);
        })
    }; 

    const getProducts = async () =>{
        const productColRef = collection(db, "users", userToken, "wishlists", id, "products"); 
        const data = await getDocs(productColRef); 
        setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    }; 

    const changeName = () => {
        setNameToggle(true)
    }

  return (
    <div>
        <div style={{position:"relative"}}>
                <div className="topModule" style={{maxWidth:"80%",margin:"10px auto",borderRadius:"5px",background:"#ffffff"}}>
                    <div className="topmoduleGrid" style={{padding:"10px",position:"relative"}}>
                    
                    {nameToggle ? <ChangeListNameModal openModal={setNameToggle}/> : 

                        <div className="topModuleContent" style={{display:"flex",alignItems:"center"}}>
                                <div className="wlTitle" style={{marginRight:"5px"}}>
                                    <h1>{wishList.name}</h1>
                                </div>

                                <div className="editWLNameBtn" onClick={changeName}>
                                    <EditIcon style={{fontSize:"1.5rem",color:"#a3b9cd",marginTop:"5.5px"}}/>
                                </div> 
                        </div>

                    }



                    {/* {nameToggle ? <ChangeListNameModal openModal={setNameToggle} /> : 

                        <div className="topModuleContent" style={{display:"flex",alignItems:"center"}}>
                            <div className="wlTitle" style={{marginRight:"5px"}}>
                                <h1>{wishList.name}</h1>
                            </div>

                            <div className="editWLNameBtn" onClick={changeName}>
                                <EditIcon style={{fontSize:"1.5rem",color:"#a3b9cd",marginTop:"5.5px"}}/>
                            </div> 
                        </div>
    
                    }  */}
                    </div>
                </div>   

                {addProductModal && <AddProductModal openModal={setAddProductModal} updateProducts={getProducts} userID={userToken}/>}

                <div className="productGrid" style={{maxWidth:"80%",margin:"auto",display:"grid",gridGap:"10px",gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"}}>
                    <div className="addProductCard" onClick={()=>setAddProductModal(true)} style={{maxHeight:"300px",background:"white",borderRadius:"5px",position:"relative",transition:"0.2s ease-in",background:"linear-gradient(0deg, rgba(104,179,211,1) 0%, rgba(126,207,88,1) 100%)"}}>
                        <div className="addProductContent" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>
                            <AddCircleIcon style={{fontSize:"60px",color:"white"}}/>
                        </div>
                        
                    </div>
                    {products.map((prod, key)=> {
                        return(
                            <a key={key} target="_blank" href={prod.link}>
                                <div className="gridCard" style={{maxHeight:"300px",background:"white",borderRadius:"5px",position:"relative",transition:"0.2s ease-in"}}>
                                    <div className="productImg" style={{height:"150px",textAlign:"center",marginBottom:"8px"}}>
                                        <img style={{maxWidth:"150px",padding:"10px"}} src={prod.imglink} alt="" />
                                    </div>
                                    <div className="productInfo" style={{padding:"10px"}}>
                                        <h3 style={{marginBottom:"10px"}}>{prod.name}</h3>
                                        <p style={{display:"flex", alignItems:"center"}}><MonetizationOnIcon />{prod.price} SEK</p>
                                        <p style={{display:"flex", alignItems:"center"}}><StoreIcon /> {prod.store}</p>
                                    </div>
                                </div>
                            </a>
                        )
                    })}

                    

                </div>
                
            </div>
        
    </div>
  )
}

export default WishListProductComponent