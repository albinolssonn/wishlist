import React, { useState } from "react";
import WishlistProductsComponent from "../../Components/WishlistProductsComponent";
import VerticalNav from "../../Navigation/VerticalNav";
import AdComponent from "../../Components/AdComponent";

const ProfileProductPage = ({ userToken }) => {
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
          <VerticalNav userId={userToken} setGridSize={setMenuToggle} />
        </div>

        <div className="mainContent">
          <WishlistProductsComponent />
        </div>
      </div>
      <AdComponent />
    </>
  );
};

export default ProfileProductPage;
