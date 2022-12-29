import React, { useState } from "react";
import WishlistProductsComponent from "../../Components/WishlistProductsComponent";
import VerticalNav from "../../Navigation/VerticalNav";
import AdComponent from "../../Components/AdComponent";

const ProfileProductPage = ({ loggedInUser }) => {
  const [menuToggle, setMenuToggle] = useState("60px 1fr");

  return (
    <>
      <div
        style={{
          background: "#f5f5f5",
          display: "grid",
          gridTemplateColumns: `${menuToggle}`,
          minHeight: "100vh",
        }}
      >
        <div className="navbar">
          <VerticalNav setGridSize={setMenuToggle} />
        </div>

        <div className="mainContent">
          <WishlistProductsComponent userToken={loggedInUser} />
        </div>
      </div>
      <AdComponent />
    </>
  );
};

export default ProfileProductPage;
