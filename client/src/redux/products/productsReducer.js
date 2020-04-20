const INITIAL_STATE = {
  products: [],
  loaded: false
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loaded: true };
    default:
      return state;
  }
};

export default productsReducer;
