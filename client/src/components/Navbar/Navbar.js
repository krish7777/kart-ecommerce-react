import { Link } from "react-router-dom";
import React from "react";
import { auth } from "../../firebase/firebase";
import "./Navbar.css";
import { connect } from "react-redux";
import { emptyCart } from "../../redux/cart/cartActions";

const Navbar = (props) => {
  const { currentUser, setUser } = props;

  const SignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      props.resetCart();
    });
  };

  return (
    <div className="main-navbar">
      <div>
        <Link to="/" className="valign-wrapper">
          <i style={{ width: "100%" }} className="material-icons ">
            home
          </i>
        </Link>
      </div>

      <div>
        <Link to="/men" className="valign-wrapper">
          <p style={{ width: "100%" }}> Men</p>
        </Link>
      </div>
      <div>
        <Link to="/women" className="valign-wrapper">
          <p style={{ width: "100%" }}> Women</p>
        </Link>
      </div>

      <div>
        <Link to="/add-product" className="valign-wrapper">
          <p style={{ width: "100%" }}> Add Product</p>
        </Link>
      </div>
      <div>
        <Link to="/cart" className="valign-wrapper">
          <p style={{ width: "100%" }}> Cart</p>
        </Link>
      </div>

      {currentUser ? (
        <>
          <div>
            <Link to="/" onClick={SignOut} className="valign-wrapper">
              <p style={{ width: "100%" }}> Sign Out</p>
            </Link>
          </div>
          <div>
            <Link to="/" className="valign-wrapper">
              <p style={{ width: "100%" }}> Dashboard</p>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/signin" className="valign-wrapper">
              <p style={{ width: "100%" }}> Sign In</p>
            </Link>
          </div>
          <div>
            <Link to="/signup" className="valign-wrapper">
              <p style={{ width: "100%" }}> Sign Up</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetCart: () => dispatch(emptyCart()),
});

export default connect(null, mapDispatchToProps)(Navbar);
