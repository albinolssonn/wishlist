import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../Server/firebase-config";
import { getProducts } from "./GetFunctions";

export const removeWishlist = async (id, setIsLoading) => {
  const wishListDocRef = doc(db, "wishlists", id);
  const productColRef = collection(db, "wishlists", id, "products");
  setIsLoading(true);
  const querySnapshot = await getDocs(productColRef);
  querySnapshot.forEach((doc) => {
    removeProduct(doc.id);
  });
  await deleteDoc(wishListDocRef);
  setIsLoading(false);
};

export const removeProduct = async (
  productId,
  id,
  setIsLoading,
  setProducts
) => {
  const productColRef = doc(db, "wishlists", id, "products", productId);
  setIsLoading(true);
  await deleteDoc(productColRef);
  setIsLoading(false);
  getProducts(id, setProducts, setIsLoading);
};
