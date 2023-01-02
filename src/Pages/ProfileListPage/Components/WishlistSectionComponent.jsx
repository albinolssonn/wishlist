import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../Server/firebase-config";
import AddWishListModal from "../../../Modals/AddWishlistModal";
import "../../../Assets/ButtonStyle.css";
import "../../../Styling/wishlistCollectionComponent.css";
import LoadingComponent from "../../../Components/LoadingComponent";
import TopBarComponent from "./TopBarComponent";
import CollectionComponent from "./CollectionComponent";

const WishlistSectionComponent = () => {
  const { id } = useParams();
  const wishlistQuery = query(
    collection(db, "wishlists"),
    where("owner", "==", id)
  );
  const [wishlists, setWishLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsersWishList();
  }, []);

  const getUsersWishList = async () => {
    setIsLoading(true);
    const data = await getDocs(wishlistQuery);
    setIsLoading(false);
    setWishLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
            updateWishList={getUsersWishList}
            openModal={setShowModal}
          />
        )}

        <CollectionComponent lists={wishlists} />
      </div>
    );
  }
};

export default WishlistSectionComponent;
