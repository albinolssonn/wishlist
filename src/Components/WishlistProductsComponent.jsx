import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../Server/firebase-config";
import "../Styling/wishlistProductsComponent.css";

import LoadingComponent from "./LoadingComponent";
import DeleteVerificationModal from "../Modals/RemoveWishlistVerificationModal";
import ChangeListNameModal from "../Modals/UpdateWishlistNameModal";
import AddProductModal from "../Modals/AddProductModal";

import SellIcon from "@mui/icons-material/Sell";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StoreIcon from "@mui/icons-material/Store";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";

const WishlistProductsComponent = ({ userToken }) => {
  const navigate = useNavigate();
  const { id, user } = useParams();
  const [wishList, setWishList] = useState("");
  const [products, setProducts] = useState([]);
  const [nameToggle, setNameToggle] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteVerification, setShowDeleteVerification] = useState(false);
  const [secretUrl, setSecretUrl] = useState("");
  const [copyToggle, setCopyToggle] = useState(false);

  useEffect(() => {
    getWishlist();
    getProducts();
    setSecretUrl(`localhost:3000/u/${user}/wl/${id}`);
  }, []);

  const getWishlist = async () => {
    const wishListDocRef = doc(db, "wishlists", id);
    const returnData = await getDoc(wishListDocRef).then((doc) => {
      setWishList(doc.data(), doc.id);
    });
  };

  const getProducts = async () => {
    const productColRef = collection(db, "wishlists", id, "products");
    setIsLoading(true);
    const data = await getDocs(productColRef);
    setIsLoading(false);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const removeWishlist = async () => {
    const wishListDocRef = doc(db, "wishlists", id);
    const productColRef = collection(db, "wishlists", id, "products");
    setIsLoading(true);
    const querySnapshot = await getDocs(productColRef);
    querySnapshot.forEach((doc) => {
      removeProduct(doc.id);
    });
    await deleteDoc(wishListDocRef);
    setIsLoading(false);
    navigate(`/profile/${user}`);
  };

  const removeProduct = async (productId) => {
    const productColRef = doc(db, "wishlists", id, "products", productId);
    setIsLoading(true);
    await deleteDoc(productColRef);
    setIsLoading(false);
    getProducts();
  };

  const shareWishlist = async () => {
    const wishListDocRef = doc(db, "wishlists", id);
    if (wishList.shareable == true) {
      await updateDoc(wishListDocRef, {
        shareable: false,
      });
    } else {
      await updateDoc(wishListDocRef, {
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

  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  } else {
    return (
      <div className="product-collection-section">
        <div className="pr-top-bar">
          <div className="pr-top-bar-container">
            {nameToggle ? (
              <ChangeListNameModal
                getNewName={getWishlist}
                userID={user}
                openModal={setNameToggle}
              />
            ) : (
              <div className="pr-top-bar-content">
                <div className="wl-top-bar-title">
                  <h1>{wishList.name}</h1>
                </div>
                <div className="pr-top-bar-buttons">
                  {wishList.shareable ? (
                    <div className="secret-url-container">
                      {copyToggle ? (
                        <button id="secret-url-btn-true">
                          <CheckCircleIcon
                            style={{ color: "#499d24", fontSize: "1.5rem" }}
                          />
                          Länk kopierad!
                        </button>
                      ) : (
                        <button
                          id="secret-url-btn-false"
                          onClick={copyUrlFunction}
                        >
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
                    onClick={() => setShowDeleteVerification(true)}
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

        {addProductModal && (
          <AddProductModal
            openModal={setAddProductModal}
            updateProducts={getProducts}
          />
        )}

        <div className="wl-product-grid-section">
          <div id="wl-add-product-btn" onClick={() => setAddProductModal(true)}>
            <div className="wl-add-product-btn-content">
              <AddCircleIcon style={{ fontSize: "60px" }} />
              <p>Lägg till produkt</p>
            </div>
          </div>

          {products.map((prod, key) => {
            return (
              <div key={key} className="wl-product-card">
                <div id="remove-product-btn">
                  <DeleteIcon
                    style={{ fontSize: "1.1rem" }}
                    onClick={() => removeProduct(prod.id)}
                  />
                </div>

                <a target="_blank" href={prod.link}>
                  <div className="wl-product-card-content">
                    <div className="wl-product-card-img">
                      <img
                        style={{ maxWidth: "150px", padding: "10px" }}
                        src={prod.imglink}
                      />
                    </div>
                    <div className="wl-product-card-info">
                      <h3 style={{ marginBottom: "10px" }}>{prod.name}</h3>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <SellIcon />
                        {prod.price} SEK
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <StoreIcon /> {prod.store}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {showDeleteVerification && (
          <DeleteVerificationModal
            deleteVerification={setShowDeleteVerification}
            removeWishlist={removeWishlist}
          />
        )}
      </div>
    );
  }
};

export default WishlistProductsComponent;
