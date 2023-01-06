import React, { useEffect } from "react";
import SellIcon from "@mui/icons-material/Sell";
import StoreIcon from "@mui/icons-material/Store";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ProductCollectionComponent = ({
  products,
  setAddProductModal,
  removeProductHandler,
}) => {
  return (
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
  );
};
export default ProductCollectionComponent;
