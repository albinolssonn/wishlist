import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../Styling/wishlistProductsComponent.css";

import LoadingComponent from "../../../Components/LoadingComponent";
import DeleteVerificationModal from "../../../Modals/DeleteVerificationModal";
import AddProductModal from "../../../Modals/AddProductModal";

import TopBarComponent from "./TopBarComponent";
import { getProducts } from "../../../Functions/GetFunctions";
import {
  removeProduct,
  removeWishlist,
} from "../../../Functions/RemoveFunctions";
import ProductGridComponent from "./ProductGridComponent";

const ProductSectionComponent = () => {
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

        <ProductGridComponent
          products={products}
          setAddProductModal={setAddProductModal}
          removeProductHandler={removeProductHandler}
        />

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

export default ProductSectionComponent;
