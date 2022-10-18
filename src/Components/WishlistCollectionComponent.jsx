import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../Server/firebase-config';
import { useNavigate } from 'react-router-dom';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddWishListModal from '../Modals/AddWishlistModal'; 
import '../Assets/ButtonStyle.css';
import '../Styling/wishlistCollectionComponent.css'
import LoadingComponent from './LoadingComponent';

const WishlistCollectionComponent = () => {
    const { id } = useParams(); 
    const wishListColRef = collection(db, "users", id, "wishlists"); 
    const [wishlists, setWishLists] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate(); 

    useEffect(() => {
        getUsersWishList();
    }, []); 

    const getUsersWishList = async () =>{
        setIsLoading(true); 
        const data = await getDocs(wishListColRef); 
        setIsLoading(false); 
        setWishLists(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    }; 


    if(isLoading){
        return(
            <>
                <LoadingComponent />
            </>
        )
    } else {
        return (
            <div className='wishlist-collection-section'>
                <div className="wl-top-bar">
                    <div className="wl-top-bar-grid">
                        <div className="wl-top-bar-title">
                            <h1>Dina önskelistor</h1>
                        </div>

                        <div className="wl-top-bar-buttons">
                            <div className="add-wishlist-modal-btn" onClick={()=> setShowModal(true)}>
                                <PlaylistAddIcon style={{fontSize:"2.1rem",color:"green",marginTop:"5.7px"}}/>
                            </div>
                        </div>
                    </div>
                </div>
        
                {showModal && <AddWishListModal updateWishList={getUsersWishList} openModal={setShowModal}/>}
        
                <div className="wl-collection-grid">
                    {wishlists.map((list, key) => {
                        return(
                            <div className="wl-grid-card" onClick={()=>navigate(`/wlist/${list.id}`)} style={{background:`#${list.color}`}} key={key}>        
                                <div className="wl-grid-card-title">
                                    <h2>{list.name}</h2>
                                </div>                            
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


export default WishlistCollectionComponent