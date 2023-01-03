import React, { useEffect, useState } from "react";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "../Navigation/VerticalNav.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Server/firebase-config";

const VerticalNav = ({ setGridSize }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [menuStatus, setMenuStatus] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const openMenuFunction = () => {
    setMenuStatus(true);
    setGridSize("250px auto");
  };

  const foldMenuFunction = () => {
    setMenuStatus(false);
    setGridSize("60px auto");
  };

  const NavData = [
    {
      title: "Önskelistor",
      icon: <PlaylistAddCheckIcon />,
      // link: `profile/${auth.currentUser.uid}`,
    },
  ];

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
    localStorage.clear();
  };

  if (menuStatus) {
    return (
      <div
        className="navbar"
        style={{ zIndex: "10", position: "fixed", marginRight: "10px" }}
        onMouseLeave={foldMenuFunction}
      >
        <div
          className="navbar__content"
          style={{
            background: "#ffffff",
            height: "100vh",
            position: "relative",
            width: "250px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            zIndex: "5",
          }}
        >
          <div
            className="logo__container"
            style={{ padding: "20px 20px 50px 20px", textAlign: "center" }}
          >
            <img src="/listify-logo.png" alt="" style={{ maxWidth: "110px" }} />
          </div>

          <ul className="navbarList" style={{ height: "auto", width: "100%" }}>
            {NavData.map((val, key) => {
              return (
                <li
                  key={key}
                  className="navRow"
                  id={
                    window.location.pathname == "/" + val.link ? "active" : ""
                  }
                  onClick={() => navigate("/" + val.link)}
                >
                  <div
                    id="icon"
                    style={{
                      flex: "30%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {val.icon}
                  </div>
                  <div id="title" style={{ flex: "70%" }}>
                    {val.title}
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="navbarList" style={{ height: "auto", width: "100%" }}>
            <li
              className="navRow"
              style={{
                borderRadius: "0px 50px 50px 0px",
                position: "absolute",
                bottom: "20px",
              }}
              id={window.location.pathname == "/" ? "active" : ""}
              onClick={logout}
            >
              <div
                id="icon"
                style={{ flex: "30%", display: "grid", placeItems: "center" }}
              >
                <LogoutIcon />
              </div>
              <div id="title" style={{ flex: "70%" }}>
                Logga ut
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="folded-navbar"
        style={{ zIndex: "10", position: "fixed" }}
        onMouseOver={openMenuFunction}
      >
        <div
          className="folded-navbar-content"
          style={{
            background: "#ffffff",
            height: "100vh",
            position: "relative",
            width: "60px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <div
            className="logo__container"
            style={{ padding: "20px 20px 50px 20px", textAlign: "center" }}
          >
            <img
              src="/listify-logo-small.png"
              alt=""
              style={{ maxHeight: "49.08px" }}
            />
          </div>

          <ul className="navbarList" style={{ height: "auto", width: "100%" }}>
            {NavData.map((val, key) => {
              return (
                <li
                  key={key}
                  className="navRow"
                  id={
                    window.location.pathname == "/" + val.link ? "active" : ""
                  }
                  onClick={() => navigate("/" + val.link)}
                >
                  <div
                    id="icon"
                    style={{
                      flex: "30%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {val.icon}
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="navbarList" style={{ height: "auto", width: "100%" }}>
            <li
              className="navRow"
              style={{
                borderRadius: "0px 50px 50px 0px",
                position: "absolute",
                bottom: "20px",
              }}
              id={window.location.pathname == "/" ? "active" : ""}
              onClick={logout}
            >
              <div id="icon" style={{ display: "grid", placeItems: "center" }}>
                <LogoutIcon />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default VerticalNav;
