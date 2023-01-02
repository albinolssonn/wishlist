import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "./Server/firebase-config";

export const [user, setUser] = useState(null);

export const UserCheck = () => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
};
