import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const CollectionComponent = ({ lists }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="wl-collection-grid">
      {lists.map((list, key) => {
        return (
          <div
            className="wl-grid-card"
            onClick={() => navigate(`/u/${id}/w/${list.id}`)}
            style={{ background: `#${list.color}` }}
            key={key}
          >
            <div className="wl-grid-card-title">
              <h2>{list.name}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionComponent;
