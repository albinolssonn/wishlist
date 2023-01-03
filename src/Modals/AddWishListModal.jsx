import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RLInput from "../Assets/StandardInput";
import { db } from "../Server/firebase-config";

function AddWishlistModal({ openModal, updateWishList }) {
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("");
  const [colorBtn1, setColorBtn1] = useState("");
  const [colorBtn2, setColorBtn2] = useState("");
  const [colorBtn3, setColorBtn3] = useState("");
  const [colorBtn4, setColorBtn4] = useState("");
  const [colorBtn5, setColorBtn5] = useState("");
  const [colorBtn6, setColorBtn6] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const { id } = useParams();

  const addWishList = async () => {
    if ((newName != "") & (newColor != "")) {
      await addDoc(collection(db, "wishlists"), {
        name: newName,
        color: newColor,
        owner: id,
      })
        .then(() => {
          openModal(false);
          updateWishList();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      setErrorCode("Listan behöver ett namn och en färg.");
    }
  };

  const setWishlistColor = (colorValue) => {
    if (colorValue == 1) {
      setColorBtn1("cbActive");
    } else {
      setColorBtn1("");
    }
    if (colorValue == 2) {
      setColorBtn2("cbActive");
    } else {
      setColorBtn2("");
    }
    if (colorValue == 3) {
      setColorBtn3("cbActive");
    } else {
      setColorBtn3("");
    }
    if (colorValue == 4) {
      setColorBtn4("cbActive");
    } else {
      setColorBtn4("");
    }
    if (colorValue == 5) {
      setColorBtn5("cbActive");
    } else {
      setColorBtn5("");
    }
    if (colorValue == 6) {
      setColorBtn6("cbActive");
    } else {
      setColorBtn6("");
    }
  };

  return (
    <div
      className="wlModalBG"
      style={{
        width: "80%",
        margin: "auto",
        marginBottom: "10px",
        background: "#ffffff",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      <div
        className="wlModalContainer"
        style={{
          maxWidth: "50%",
          margin: "auto",
          padding: "10px",
          position: "relative",
        }}
      >
        <div
          className="wlTitleDiv"
          style={{ marginBottom: "10px", textAlign: "center" }}
        >
          <h2>Lägg till en önskelista</h2>
        </div>

        <div className="wlNameForm" style={{ textAlign: "center" }}>
          <input
            type="text"
            style={RLInput}
            required
            placeholder="Namn på önskelista"
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
        </div>

        {errorCode && (
          <p style={{ color: "red", fontSize: ".7rem" }}>{errorCode}</p>
        )}

        <div className="wlColorForm">
          <div
            className="wlColorGrid"
            style={{
              margin: "20px 0px",
              display: "grid",
              textAlign: "center",
              gridTemplateColumns: "repeat(auto-fit, minmax(30px, 1fr))",
            }}
          >
            <div
              className="colorRadioBtn"
              id={colorBtn1}
              onClick={() => setNewColor("ff6e6e") & setWishlistColor(1)}
              style={{
                width: "20px",
                height: "20px",
                background: "#ff6e6e",
                margin: "auto",
                borderRadius: "3px",
              }}
            ></div>
            <div
              className="colorRadioBtn"
              id={colorBtn2}
              onClick={() => setNewColor("ffce6e") & setWishlistColor(2)}
              style={{
                width: "20px",
                height: "20px",
                background: "#ffce6e",
                margin: "auto",
                borderRadius: "3px",
              }}
            ></div>
            <div
              className="colorRadioBtn"
              id={colorBtn3}
              onClick={() => setNewColor("afff6e") & setWishlistColor(3)}
              style={{
                width: "20px",
                height: "20px",
                background: "#afff6e",
                margin: "auto",
                borderRadius: "3px",
              }}
            ></div>
            <div
              className="colorRadioBtn"
              id={colorBtn4}
              onClick={() => setNewColor("b6fbfa") & setWishlistColor(4)}
              style={{
                width: "20px",
                height: "20px",
                background: "#b6fbfa",
                margin: "auto",
                borderRadius: "3px",
              }}
            ></div>
            <div
              className="colorRadioBtn"
              id={colorBtn5}
              onClick={() => setNewColor("b492ff") & setWishlistColor(5)}
              style={{
                width: "20px",
                height: "20px",
                background: "#b492ff",
                margin: "auto",
                borderRadius: "3px",
              }}
            ></div>
            <div
              className="colorRadioBtn"
              id={colorBtn6}
              onClick={() => setNewColor("ff92e6") & setWishlistColor(6)}
              style={{
                width: "20px",
                height: "20px",
                background: "#ff92e6",
                margin: "auto",
                borderRadius: "3px",
              }}
            ></div>
          </div>
        </div>

        <div className="wlButtonContainer" style={{ textAlign: "center" }}>
          <button id="closeModalBtn" onClick={() => openModal(false)}>
            Avbryt
          </button>
          <button id="addWishListBtn" onClick={addWishList}>
            Lägg till
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddWishlistModal;
