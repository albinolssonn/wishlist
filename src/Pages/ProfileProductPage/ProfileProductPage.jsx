import React, { useState } from "react";
import VerticalNav from "../../Navigation/VerticalNav";
import AdComponent from "../../Components/AdComponent";
import ProductSectionComponent from "./Components/ProductSectionComponent";

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
          <ProductSectionComponent />
        </div>
      </div>
      <AdComponent />
    </>
  );
};

export default ProfileProductPage;
