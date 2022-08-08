import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import NameInput from '../Assets/NameInput'
import { db } from '../Server/firebase-config';
import { useParams } from 'react-router-dom';

const ChangeListNameModal = ({ getNewName,userID, openModal }) => {
  const { id } = useParams(); 
  const [wishList, setWishList] = useState(""); 
  const [newWLName,setNewWLName] = useState(""); 
  const [wlColor,setWLColor] = useState(""); 

  useEffect(() => {
    getWLColor();
  }, []); 

  const getWLColor = async () => {
    const wlColRef = doc(db, "users", userID, "wishlists", id)
    const returnData = await getDoc(wlColRef)
    .then((doc) => {
      setWishList(doc.data(), doc.id);
    })
  }; 

  

  const updateWLName = async () => {
    await setDoc(doc(db, "users", userID, "wishlists", id), {
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
      <div className="buttonDiv" style={{marginLeft:"10px"}}>
        <button onClick={updateWLName}>Ändra namn</button>
        <button onClick={()=> openModal(false)}>Avbryt</button>
      </div>
        
    </div>
  )
  }


export default ChangeListNameModal