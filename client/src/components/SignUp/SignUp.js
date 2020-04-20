import { auth, createUserProfileDocument } from "../../firebase/firebase";

import React from "react";

import M from "materialize-css";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      M.toast({ html: "Passwords do not match", classes: "red" });
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
      M.toast({ html: "User successfully created", classes: "green" });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      this.props.history.push("/");
    } catch (error) {
      console.error(error);
      M.toast({ html: "Error in creating user", classes: "red" });
    }
  };

  handleChange = (event) => {
    console.log(this.props);
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="container">
        <h1>SignUp</h1>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field">
              <input
                type="text"
                name="displayName"
                id="displayName"
                value={displayName}
                onChange={this.handleChange}
                required
              ></input>
              <label htmlFor="displayName">Display Name</label>
            </div>
          </div>
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
          <div className="row">
            <div className="input-field">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                required
              ></input>
              <label for="confirmPassword">Confirm Password</label>
            </div>
          </div>

          <button className="btn" type="submit">
            SignUp
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
