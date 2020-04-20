import React, { useState } from "react";
import "./ProductCard.css";

import M from "materialize-css";
import { connect } from "react-redux";
import { addProductToCart } from "../../redux/cart/cartActions";

const ProductCard = (props) => {
  const { product } = props;

  const {
    name,
    // gender,
    picUrl,
    // category,
    price,
    // description,
    // rating,
    sizes,
  } = product;

  const [selected, setSelected] = useState(false);
  const [sizeSelected, setSize] = useState(null);

  const changeSelected = (e) => {
    if (sizeSelected === e) {
      setSize(null);
      setSelected(false);
    } else {
      setSize(e);
      setSelected(true);
    }
  };

  const addToCart = () => {
    if (!selected) {
      M.toast({ html: "Please select a size", classes: "red" });
    } else {
      M.toast({ html: "Item added to cart", classes: "green" });
      console.log(name + " -- " + sizeSelected);

      //TODO : IMPLEMENT ADD TO CART HERE
      //{name,size,price,quantity}

      props.addProductToCartFn({
        name,
        size: sizeSelected,
        price,
        quantity: 1,
        picUrl,
      });
    }
  };

  return (
    <div className="product-card">
      <h5>{name}</h5>
      <h6>Rs.{price}</h6>

      <img src={picUrl} alt={name} className="center-img"></img>
      <div className="product-card--sizelist sizes-selector">
        {sizes.map((size) => (
          <div
            className={`valign-wrapper boxes card-size--wrapper show${
              sizeSelected === size ? "true" : ""
            }`}
            key={size}
            onClick={() => changeSelected(size)}
          >
            <div className="center-align">{size}</div>
          </div>
        ))}
      </div>

      <div>
        {/* <button>Wishlist</button> */}
        <button className="btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addProductToCartFn: (product) => dispatch(addProductToCart(product)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
