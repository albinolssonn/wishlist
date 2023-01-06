import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Server/firebase-config";

export const getUsersWishlists = async (id, setIsLoading, setWishlists) => {
  const wishlistQuery = query(
    collection(db, "wishlists"),
    where("owner", "==", id)
  );
  setIsLoading(true);
  const data = await getDocs(wishlistQuery);
  setIsLoading(false);
  setWishlists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

export const getProducts = async (id, setProducts, setIsLoading) => {
  const productColRef = collection(db, "wishlists", id, "products");
  setIsLoading(true);
  const data = await getDocs(productColRef);
  setIsLoading(false);
  setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};
