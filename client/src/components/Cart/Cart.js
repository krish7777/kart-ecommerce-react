import React from "react";

import "./Cart.css";
import { connect } from "react-redux";

import CartItem from "../CartItem/CartItem";
import axios from "axios";

import {
  removeProduct,
  decreaseQuantity,
  addProductToCart,
} from "../../redux/cart/cartActions";
import { Link, withRouter } from "react-router-dom";

const Cart = ({
  products,
  removeItem,
  decrementQuantity,
  incrementQuantity,
  user,
  history,
}) => {
  // console.log(props.products);
  let total = 0;
  products &&
    products.forEach((prod) => {
      total += prod.price * prod.quantity;
    });

  const handlePayment = () => {
    console.log("payment");

    if (!user) {
      history.push("/signin");
    } else {
      console.log("user is authenticated.. total is - ", total);
      console.log(user);
      const data = {
        purpose: "Shopping",
        amount: total,
        buyer_name: user.displayName,
        email: user.email,
        redirect_url: "http://localhost:3000/",
      };
      axios
        .post("http://localhost:8000/api/pay", data)
        .then((res) => {
          console.log(res.data);
          window.location.href = res.data;
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="cart-wrapper">
      <h1 className="center">Cart</h1>
      <div className="cart-items">
        {products &&
          products.map((item, i) => (
            <CartItem
              item={item}
              key={i}
              removeItem={() => removeItem(item)}
              decrementQuantity={() => decrementQuantity(item)}
              incrementQuantity={() =>
                incrementQuantity({ ...item, quantity: 1 })
              }
            />
          ))}
      </div>

      {products.length ? (
        <p className="cart-total">Total: {total}</p>
      ) : (
        <p className="center">Cart is empty</p>
      )}

      {products.length ? (
        <div className="cart-buttons">
          <div className="btn">
            <Link to="/">Continue Shopping</Link>
          </div>
          <div className="btn" onClick={handlePayment}>
            Pay Now
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  products: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (prod) => dispatch(removeProduct(prod)),
  decrementQuantity: (prod) => dispatch(decreaseQuantity(prod)),
  incrementQuantity: (prod) => dispatch(addProductToCart(prod)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
