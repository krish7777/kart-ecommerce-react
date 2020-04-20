import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import { auth, createUserProfileDocument } from "./firebase/firebase";

import SignUp from "./components/SignUp/SignUp";
import Products from "./components/Products/Products";
import AddProduct from "./components/AddProduct/AddProduct";

import { setUser } from "./redux/user/userActions";

import { connect } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SignIn";
import Filters from "./components/Filters/Filters";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.props.setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Navbar
          currentUser={this.props.currentUser}
          setUser={this.props.setUser}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/signup"
            render={(props) =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignUp {...props} />
              )
            }
          />
          <Route
            path="/men"
            render={(props) => (
              <Filters gender="M" categories={["Shirts", "Jeans"]} key="M" />
            )}
          />

          <Route
            path="/women"
            render={(props) => (
              <Filters gender="F" categories={["Tops", "Jeans"]} key="F" />
            )}
          />

          <Route
            path="/signin"
            render={(props) =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignIn {...props} />
              )
            }
          />
          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/products">
            <Products />
          </Route>
          <Route path="/add-product">
            <AddProduct />
          </Route>
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
