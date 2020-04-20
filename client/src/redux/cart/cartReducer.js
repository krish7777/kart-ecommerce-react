const INITIAL_STATE = [];

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      console.log(state);
      const product =
        state.length &&
        state.find(
          (prod) =>
            prod.name === action.payload.name &&
            prod.size === action.payload.size
        );
      if (product) {
        product.quantity = product.quantity + 0 + action.payload.quantity;
        return state.map((prod) => {
          if (
            prod.name === action.payload.name &&
            prod.size === action.payload.size
          ) {
            return product;
          } else return prod;
        });
      } else {
        if (!state.length) {
          return [action.payload];
        }

        return [...state, action.payload];
      }
    }

    case "EMPTY_CART":
      return [];
    case "REMOVE_PRODUCT": {
      return state.filter((prod) => {
        return (
          prod.name !== action.payload.name || prod.size !== action.payload.size
        );
      });
    }
    case "DECREASE_QUANTITY": {
      const product =
        state.length &&
        state.find(
          (prod) =>
            prod.name === action.payload.name &&
            prod.size === action.payload.size
        );

      if (product.quantity === 1) {
        return state.filter(
          (prod) =>
            prod.name !== action.payload.name ||
            prod.size !== action.payload.size
        );
      } else {
        product.quantity--;
        return state.map((prod) => {
          if (
            prod.name === action.payload.name &&
            prod.size === action.payload.size
          ) {
            return product;
          } else return prod;
        });
      }
    }

    default:
      return state;
  }
};

export default cartReducer;
