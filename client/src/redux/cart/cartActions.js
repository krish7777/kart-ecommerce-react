export const addProductToCart = (prod) => ({
  payload: prod,
  type: "ADD_PRODUCT",
});

export const emptyCart = (prod) => ({
  type: "EMPTY_CART",
});

export const removeProduct = (prod) => ({
  payload: prod,
  type: "REMOVE_PRODUCT",
});

export const decreaseQuantity = (prod) => ({
  payload: prod,
  type: "DECREASE_QUANTITY",
});
