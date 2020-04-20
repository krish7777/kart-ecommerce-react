import React, { Component } from "react";
import { auth, SignInWithGoogle } from "../../firebase/firebase";

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }

    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <h1>SignIn</h1>

        <div className="row">
          <div className="input-field">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
              required
            />
            <label for="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.handleChange}
              required
            ></input>
            <label for="password">Password</label>
          </div>
        </div>

        <button className="btn" onClick={this.handleSubmit}>
          SignIn
        </button>
        <span> OR </span>
        <button className="btn" onClick={SignInWithGoogle}>
          SignIn with google
        </button>
      </div>
    );
  }
}
