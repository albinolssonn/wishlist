import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../Server/firebase-config';
import { useParams } from 'react-router-dom';
import NameInput from '../Assets/NameInput'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const ChangeListNameModal = ({ getNewName,userID, openModal }) => {
  const user = auth.currentUser; 
  const { id } = useParams(); 
  const [wishList, setWishList] = useState(""); 
  const [newWLName,setNewWLName] = useState(""); 
  const [wlColor,setWLColor] = useState(""); 

  useEffect(() => {
    getWLColor();
  }, []); 

  const getWLColor = async () => {
    const wlColRef = doc(db, "users", user.uid, "wishlists", id)
    const returnData = await getDoc(wlColRef)
    .then((doc) => {
      setWishList(doc.data(), doc.id);
    })
  }; 

  

  const updateWLName = async () => {
    await setDoc(doc(db, "users", user.uid, "wishlists", id), {
        name: newWLName,
        color: wishList.color
        })
        .then(() => {
          openModal(false)
          getNewName()
          console.log ("Successful Profile Registration")
        })
        .catch((error) => {
            console.error("Error writing document: ", error)
        })
}

  return (
    <div style={{position:"relative",display:"flex",alignItems:"center"}}>
      <div className="inputDiv">
        <input style={NameInput} type="text" onChange={(event) => {setNewWLName(event.target.value)}}/>
      </div>
      <div className="buttonDiv" style={{marginLeft:"10px",display:"flex",gap:"5px"}}>
        <div className="updateNameBtn" onClick={updateWLName}>
          <CheckIcon />
        </div>
        <div className="closeNameChangeBtn" onClick={()=> openModal(false)}>
          <CloseIcon />
        </div>
      </div>
        
    </div>
  )
  }


export default ChangeListNameModal