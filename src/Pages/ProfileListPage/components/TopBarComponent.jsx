import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const TopBarComponent = ({ showAddModal }) => {
  return (
    <div className="wl-top-bar">
      <div className="wl-top-bar-grid">
        <div className="wl-top-bar-title">
          <h2>Dina önskelistor</h2>
        </div>

        <div className="wl-top-bar-buttons">
          <div
            className="add-wishlist-modal-btn"
            onClick={() => showAddModal(true)}
          >
            <p>Lägg till lista</p>
            <PlaylistAddIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBarComponent;
