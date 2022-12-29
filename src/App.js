import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Pages/SignPages/RegisterPage";
import LoginPage from "./Pages/SignPages/LoginPage";
import ProfileListPage from "./Pages/ProfileListPage/ProfileListPage";
import ProfileProductPage from "./Pages/ProfileProductPage/ProfileProductPage";
import SignedInErrorPage from "./Pages/ErrorPages/SignedInErrorPage";
import SignedOutErrorPage from "./Pages/ErrorPages/SignedOutErrorPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Server/firebase-config";
import { useState } from "react";
import SharedListPage from "./Pages/SharedProfilePage/SharedProfilePage";
import SharedProfilePage from "./Pages/SharedProfilePage/SharedProfilePage";

function App() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  if (user) {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/profile/:id"
              element={<ProfileListPage userToken={user.uid} />}
            />
            <Route
              path="/wlist/:id"
              element={<ProfileProductPage loggedInUser={user.uid} />}
            />
            <Route path="*" element={<SignedInErrorPage />} />
            <Route path="/u/:user/wl/:id" element={<SharedListPage />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<SignedOutErrorPage />} />
          <Route path="/u/:user/wl/:id" element={<SharedProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
