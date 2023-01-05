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
import { db } from "../Server/firebase-config";
import "../Styling/wishlistProductsComponent.css";

import LoadingComponent from "./LoadingComponent";
import DeleteVerificationModal from "../Modals/RemoveWishlistVerificationModal";
import AddProductModal from "../Modals/AddProductModal";

import SellIcon from "@mui/icons-material/Sell";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StoreIcon from "@mui/icons-material/Store";
import DeleteIcon from "@mui/icons-material/Delete";

import TopBarComponent from "../Pages/ProfileProductPage/Components/TopBarComponent";

const WishlistProductsComponent = () => {
  const navigate = useNavigate();
  const { id, user } = useParams();
  const [products, setProducts] = useState([]);
  const [addProductModal, setAddProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteVerification, setDeleteVerification] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

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

  // OVAN FUNKTIONER SKA FLYTTAS ÖVER // ANVÄNDAS SOM PROPS I TOP BAR COMPONENT

  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  } else {
    return (
      <div className="product-collection-section">
        <TopBarComponent />

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
            showDeleteVerification={setDeleteVerification}
            removeWishlist={removeWishlist}
          />
        )}
      </div>
    );
  }
};

export default WishlistProductsComponent;
