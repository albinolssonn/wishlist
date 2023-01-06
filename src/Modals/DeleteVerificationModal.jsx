import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import "../Assets/DeleteModalStyle.css";

const DeleteVerificationModal = ({
  showDeleteVerification,
  removeWishlist,
}) => {
  return (
    <div className="wl-delete-modal">
      <div className="wl-delete-modal-container">
        <div className="wl-delete-modal-title">
          <p>Är du säker?</p>
        </div>

        <div
          className="divider"
          style={{
            height: "1px",
            background: "#1d1d1d",
            width: "95%",
            margin: "auto",
          }}
        ></div>

        <div className="wl-delete-modal-cap">
          <p>Om du tar bort önskelistan kommer du inte att få tillbaka den.</p>
        </div>

        <div className="wl-delete-modal-buttons">
          <div
            className="wl-delete-modal-buttons-keep-btn"
            onClick={() => showDeleteVerification(false)}
          >
            <p>Behåll</p>
            <CloseIcon />
          </div>

          <div
            className="wl-delete-modal-buttons-remove-btn"
            onClick={() => removeWishlist()}
          >
            <p>Ta bort</p>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteVerificationModal;
