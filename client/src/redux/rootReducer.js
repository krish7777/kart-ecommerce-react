import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import cartReducer from "./cart/cartReducer";
// import productsReducer from "./products/productsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
