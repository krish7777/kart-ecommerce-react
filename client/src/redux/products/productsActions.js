import { firestore } from "../../firebase/firebase";

export const getProducts = products => ({
  type: "SET_PRODUCTS",
  payload: products
});

export const getProductsAsync = () => {
  return (dispatch, getState) => {
    firestore
      .collection("products")
      .get()
      .then(prods => {
        //const products = prods.docs.map(pro => pro.data());
        dispatch(getProducts(prods.docs.map(pro => pro.data())));
        console.log("dispatched " + prods.docs.map(pro => pro.data()));
      });
  };
};
