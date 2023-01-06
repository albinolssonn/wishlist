import React, { useEffect, useState } from "react";

import ChangeListNameModal from "../../../Modals/UpdateWishlistNameModal";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useParams } from "react-router-dom";
import { db } from "../../../Server/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const TopBarComponent = ({ showDeleteVerification }) => {
  const { id, user } = useParams();
  const [nameToggle, setNameToggle] = useState(false);
  const [copyToggle, setCopyToggle] = useState(false);
  const [secretUrl, setSecretUrl] = useState("");
  const [wishlist, setWishlist] = useState("");

  useEffect(() => {
    getWishlist();
    setSecretUrl(`localhost:3000/u/${user}/wl/${id}`);
  }, []);

  const getWishlist = async () => {
    const wishlistDocRef = doc(db, "wishlists", id);
    const returnData = await getDoc(wishlistDocRef).then((doc) => {
      setWishlist(doc.data(), doc.id);
    });
  };

  const shareWishlist = async () => {
    const wishlistDocRef = doc(db, "wishlists", id);
    if (wishlist.shareable == true) {
      await updateDoc(wishlistDocRef, {
        shareable: false,
      });
    } else {
      await updateDoc(wishlistDocRef, {
        shareable: true,
      });
    }
    getWishlist();
  };

  const copyUrlFunction = () => {
    navigator.clipboard.writeText(secretUrl);
    setCopyToggle(true);
    setTimeout(() => {
      setCopyToggle(false);
    }, 3000);
  };

  return (
    <div className="pr-top-bar">
      <div className="pr-top-bar-container">
        {nameToggle ? (
          <ChangeListNameModal
            updateName={getWishlist}
            openModal={setNameToggle}
            wishlist={wishlist}
          />
        ) : (
          <div className="pr-top-bar-content">
            <div className="wl-top-bar-title">
              <h2>{wishlist.name}</h2>
            </div>
            <div className="pr-top-bar-buttons">
              {wishlist.shareable ? (
                <div className="secret-url-container">
                  {copyToggle ? (
                    <button id="secret-url-btn-true">
                      <CheckCircleIcon
                        style={{ color: "#499d24", fontSize: "1.5rem" }}
                      />
                      Länk kopierad!
                    </button>
                  ) : (
                    <button id="secret-url-btn-false" onClick={copyUrlFunction}>
                      <ContentCopyIcon style={{ fontSize: "1.5rem" }} />
                      Kopiera hemlig länk
                    </button>
                  )}

                  <div id="share-wl-btn-true" onClick={shareWishlist}>
                    <LockOpenIcon
                      style={{
                        fontSize: "1.5rem",
                        color: "#ff5353",
                        marginTop: "5.5px",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div id="share-wl-btn-false" onClick={shareWishlist}>
                  <LockIcon
                    style={{
                      fontSize: "1.5rem",
                      color: "#499d24",
                      marginTop: "5.5px",
                    }}
                  />
                </div>
              )}

              <div
                id="open-settings-wl-btn"
                onClick={() => setNameToggle(true)}
              >
                <EditIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "#a3b9cd",
                    marginTop: "5.5px",
                  }}
                />
              </div>
              <div
                id="share-wl-btn-true"
                onClick={() => showDeleteVerification(true)}
              >
                <DeleteIcon
                  style={{
                    fontSize: "1.5rem",
                    color: "red",
                    marginTop: "5.5px",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBarComponent;
