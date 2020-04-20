import React from "react";

import "./CartItem.css";

const CartItem = (props) => {
  const { item, removeItem, decrementQuantity, incrementQuantity } = props;

  return (
    <div className="cart-item">
      <div className="cross">
        <div
          className="flex-center btn-floating  waves-effect waves-light "
          onClick={removeItem}
        >
          <span>X</span>
        </div>
      </div>

      <img src={item.picUrl} alt={item.name} className="pic"></img>
      <div className="name flex-center">{item.name}</div>
      <div className="quantity flex-center">
        <div>Quantity </div>
        <div
          className="btn-small btn-floating waves-effect waves-light orange-btn"
          style={{ margin: "0 5px" }}
          onClick={decrementQuantity}
        >
          &#x003C;
        </div>
        <div className="circular-box flex-center">{item.quantity}</div>
        <div
          className="btn-small btn-floating waves-effect waves-light orange-btn"
          style={{ margin: "0 5px" }}
          onClick={incrementQuantity}
        >
          &#x003E;
        </div>
      </div>
      <div className="size flex-center">
        <div>Size</div>

        <div className="circular-box flex-center">{item.size}</div>
      </div>
      <div className="price">Rs.{item.price * item.quantity}</div>
    </div>
  );
};

export default CartItem;
