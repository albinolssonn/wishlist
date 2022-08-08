import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../Server/firebase-config';
import { useNavigate } from 'react-router-dom';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddWishListModal from '../Modals/AddWishListModal'; 
import '../Assets/Buttons.css';

const WishListComponent = () => {
    const [user, setUser] = useState({});  
    const { id } = useParams(); 
    const wishListColRef = collection(db, "users", id, "wishlists"); 
    const [wishlists, setWishLists] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        getUsersWishList();
    }, []); 

    const getUsersWishList = async () =>{
        const data = await getDocs(wishListColRef); 
        setWishLists(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    }; 


    const removeWishlist = async (listId) => {
        await deleteDoc(doc(db, "users", id, "wishlists", listId));
        getUsersWishList(); 
    }

        return (
            <div style={{position:"relative"}}>
                <div className="topModule" style={{maxWidth:"80%",margin:"10px auto",borderRadius:"5px",background:"#ffffff"}}>
                    <div className="topmoduleGrid" style={{padding:"10px",display:"grid",gridTemplateColumns:"1fr 1fr",position:"relative"}}>
                        <div className="wlTitle">
                            <h1>Dina önskelistor</h1>
                        </div>
        
                        <div className="openModalBtn" onClick={()=> setShowModal(true)}>
                            <PlaylistAddIcon style={{fontSize:"2.1rem",color:"green",marginTop:"8.2px"}}/>
                        </div>
                    </div>
                </div>
        
                {showModal && <AddWishListModal updateWishList={getUsersWishList} openModal={setShowModal}/>}
        
                <div className="wishlistGrid" style={{maxWidth:"80%",margin:"auto",display:"grid",gridGap:"10px",gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"}}>
                    {wishlists.map((list, key) => {
                        return(

                                <div className="gridCard" onClick={()=>navigate(`/wlist/${list.id}`)}style={{height:"80px",padding:"10px",background:`#${list.color}`,borderRadius:"5px",position:"relative",transition:"0.2s ease-in"}} key={key}>        
                                    <div className="listCardTitle" style={{marginBottom:"30px",textAlign:"center"}}>
                                        <h2>{list.name}</h2>
                                    </div>                            
                                </div>
                        )
                    })}
                </div>
            </div>
          )

    }


export default WishListComponent