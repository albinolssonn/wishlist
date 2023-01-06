import { collection, getDocs } from "firebase/firestore";
import { db } from "../Server/firebase-config";

export const getProducts = async (id, setProducts, setIsLoading) => {
  const productColRef = collection(db, "wishlists", id, "products");
  setIsLoading(true);
  const data = await getDocs(productColRef);
  setIsLoading(false);
  setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};
