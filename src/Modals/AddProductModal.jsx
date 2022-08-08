import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import standardInput from '../Assets/StandardInput'
import { auth, db } from '../Server/firebase-config';

const AddProductModal = ( { openModal, userID, updateProducts } ) => {
    const { id } = useParams(); 
    const [productName, setProductName] = useState(""); 
    const [productPrice, setProductPrice] = useState(""); 
    const [productStore, setProductStore] = useState(""); 
    const [productLink, setProductLink] = useState(""); 
    const [productImgLink, setproductImgLink] = useState(""); 
    const [user, setUser] = useState({});  
  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    }); 

    const setNewProduct = async () => {
        await addDoc(collection(db, "users", userID, "wishlists", id, "products"), {
            name: productName,
            price: productPrice, 
            store: productStore, 
            link: productLink, 
            imglink: productImgLink
            })
            .then(() => {
                console.log ("Successful Profile Registration") // Ta bort senare
                updateProducts(); 
                openModal(false); 

            })
            .catch((error) => {
                console.error("Error writing document: ", error)
            })
    }
  return (
    <div className='wlModalBG' style={{width:"80%",margin:"auto",marginBottom:"10px",background:"#ffffff",borderRadius:"5px"}}>
        <div className="wlModalContainer" style={{maxWidth:"50%",margin:"auto",padding:"10px",position:"relative"}}>
            {/* <div className="closeModalBtnDiv" style={{textAlign:"right"}}>
                <div className="closeModalBtn" ><CloseIcon /></div>
            </div> */}

            <div className="wlTitleDiv" style={{marginBottom:"10px",textAlign:"center"}}>
                <h2>Lägg till produkt</h2>
            </div>

            <div className="wlNameForm" style={{textAlign:"center"}}>
                <input type="text" style={standardInput} placeholder='Namn på Produkt' onChange={(event) => {setProductName(event.target.value)}}/>
                <input type="text" style={standardInput} placeholder='Pris' onChange={(event) => {setProductPrice(event.target.value)}}/>
                <input type="text" style={standardInput} placeholder='Butik' onChange={(event) => {setProductStore(event.target.value)}}/>
                <input type="text" style={standardInput} placeholder='Url' onChange={(event) => {setProductLink(event.target.value)}}/>
                <input type="text" style={standardInput} placeholder='Bil-URL' onChange={(event) => {setproductImgLink(event.target.value)}}/>
            </div>

            

            <div className="wlButtonContainer" style={{textAlign:"center"}}>
                <button id='closeModalBtn' onClick={()=>openModal(false)}>Avbryt</button>
                <button id='addWishListBtn' onClick={setNewProduct}>Lägg till</button>
            </div>
            
        </div>
    </div>
  )
}

export default AddProductModal