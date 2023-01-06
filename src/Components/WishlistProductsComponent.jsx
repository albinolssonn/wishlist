import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styling/wishlistProductsComponent.css";

import LoadingComponent from "./LoadingComponent";
import DeleteVerificationModal from "../Modals/DeleteVerificationModal";
import AddProductModal from "../Modals/AddProductModal";

import SellIcon from "@mui/icons-material/Sell";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StoreIcon from "@mui/icons-material/Store";
import DeleteIcon from "@mui/icons-material/Delete";

import TopBarComponent from "../Pages/ProfileProductPage/Components/TopBarComponent";
import { getProducts } from "../Functions/GetFunctions";
import { removeProduct, removeWishlist } from "../Functions/RemoveFunctions";

const WishlistProductsComponent = () => {
  const navigate = useNavigate();
  const { id, user } = useParams();
  const [products, setProducts] = useState([]);
  const [addProductModal, setAddProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteVerification, setDeleteVerification] = useState(false);

  useEffect(() => {
    getProducts(id, setProducts, setIsLoading);
  }, []);

  const getProductsHandler = () => {
    // Ska vara i productListComponent sen
    getProducts(id, setProducts, setIsLoading);
  };

  const removeWishlistHandler = async () => {
    // Ska vara i topBar sen
    removeWishlist(id, setIsLoading);
    navigate(`/profile/${user}`);
  };

  const removeProductHandler = (productId) => {
    // Ska vara i både productListComponent och topBar
    removeProduct(productId, id, setIsLoading, setProducts);
    getProducts(id, setProducts, setIsLoading);
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
        <TopBarComponent showDeleteVerification={setDeleteVerification} />

        {addProductModal && (
          <AddProductModal
            openModal={setAddProductModal}
            updateProducts={getProductsHandler}
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
                    onClick={() => removeProductHandler(prod.id)}
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
            removeWishlist={removeWishlistHandler}
            updateProducts={getProductsHandler}
          />
        )}
      </div>
    );
  }
};

export default WishlistProductsComponent;
