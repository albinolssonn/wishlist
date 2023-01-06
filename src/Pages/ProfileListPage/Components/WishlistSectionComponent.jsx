import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddWishListModal from "../../../Modals/AddWishlistModal";
import "../../../Assets/ButtonStyle.css";
import "../../../Styling/wishlistCollectionComponent.css";
import LoadingComponent from "../../../Components/LoadingComponent";
import TopBarComponent from "./TopBarComponent";
import WishlistCollectionComponent from "./WishlistCollectionComponent";
import { getUsersWishlists } from "../../../Functions/GetFunctions";

const WishlistSectionComponent = () => {
  const { id } = useParams();
  const [wishlists, setWishlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsersWishlists(id, setIsLoading, setWishlist);
  }, []);

  const getWishlistHandler = () => {
    // Ska vara i productListComponent sen ?
    getUsersWishlists(id, setIsLoading, setWishlist);
  };

  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  } else {
    return (
      <div className="wishlist-collection-section">
        <TopBarComponent showAddModal={setShowModal} />

        {showModal && (
          <AddWishListModal
            updateWishList={getWishlistHandler}
            openModal={setShowModal}
          />
        )}

        <WishlistCollectionComponent
          setIsLoading={setIsLoading}
          lists={wishlists}
        />
      </div>
    );
  }
};

export default WishlistSectionComponent;
