import React, { Component } from "react";
import { firestore } from "../../firebase/firebase";
import M from "materialize-css";

export default class AddProduct extends Component {
  state = {
    name: "",
    category: "",
    description: "",
    picUrl: "",
    price: "",
    rating: "",
    gender: "",
    sizes: {
      L: false,
      M: false,
      XL: false,
      S: false,
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let sizesArray = [];
    let { sizes, rating, price } = this.state;
    rating = parseInt(rating);
    price = parseInt(price);
    if (sizes.L) sizesArray.push("L");
    if (sizes.XL) sizesArray.push("XL");
    if (sizes.S) sizesArray.push("S");
    if (sizes.M) sizesArray.push("M");
    console.log(this.state);
    firestore
      .collection("products")
      .add({ ...this.state, sizes: sizesArray, rating, price })
      .then(() => {
        console.log("completed");
        M.toast({ html: "Successfully added the product", classes: "green" });

        this.setState({
          name: "",
          category: "",
          description: "",
          picUrl: "",
          price: 0,
          rating: 0,
          gender: "",
          sizes: {
            L: false,
            M: false,
            XL: false,
            S: false,
          },
        });
      })
      .catch((err) => {
        M.toast({ html: "Error in adding the product", classes: "red" });
      });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleChangeGender = (gender) => {
    this.setState({ gender });
  };

  handleChangeCheckbox = (e) => {
    const { name, value, checked } = e.target;
    const obj = this.state[name];
    obj[value] = checked;
    this.setState({ [name]: obj });
  };

  render() {
    return (
      <div className="container">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                required
                onChange={this.handleChange}
                name="name"
                id="name"
                value={this.state.name}
                type="text"
                class="validate"
              ></input>
              <label for="name">Name</label>
            </div>
            <div className="input-field col s6">
              <input
                required
                onChange={this.handleChange}
                value={this.state.category}
                id="category"
                type="text"
                class="validate"
              ></input>
              <label for="category">Category</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <textarea
                required
                value={this.state.description}
                onChange={this.handleChange}
                id="description"
                class="materialize-textarea"
                data-length="120"
              ></textarea>
              <label for="description">Description</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                required
                onChange={this.handleChange}
                value={this.state.picUrl}
                id="picUrl"
                type="text"
                class="validate"
              ></input>
              <label for="picUrl">Picture URL</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                required
                onChange={this.handleChange}
                value={this.state.price}
                id="price"
                type="number"
                class="validate"
                step="0.01"
                min="0"
              ></input>
              <label for="price">Price</label>
            </div>
            <div className="input-field col s6">
              <input
                required
                value={this.state.rating}
                onChange={this.handleChange}
                id="rating"
                type="number"
                class="validate"
                step="0.1"
                min="0"
                max="5"
              ></input>
              <label for="rating">Rating</label>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              <p>Sizes</p>
              <p>
                <label>
                  <input
                    onChange={this.handleChangeCheckbox}
                    name="sizes"
                    value="XL"
                    type="checkbox"
                    checked={this.state.sizes.XL}
                  />
                  <span>XL</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    onChange={this.handleChangeCheckbox}
                    name="sizes"
                    value="L"
                    type="checkbox"
                    checked={this.state.sizes.L}
                  />
                  <span> L</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    onChange={this.handleChangeCheckbox}
                    name="sizes"
                    value="M"
                    type="checkbox"
                    checked={this.state.sizes.M}
                  />
                  <span> M</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    onChange={this.handleChangeCheckbox}
                    name="sizes"
                    value="S"
                    type="checkbox"
                    checked={this.state.sizes.S}
                  />
                  <span> S</span>
                </label>
              </p>
            </div>

            <div>
              <p>Section</p>
              <p>
                <label>
                  <input
                    onChange={() => {
                      this.handleChangeGender("M");
                    }}
                    name="section"
                    value="men"
                    type="checkbox"
                    checked={this.state.gender === "M"}
                  />
                  <span> Men</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    onChange={() => {
                      this.handleChangeGender("F");
                    }}
                    checked={this.state.gender === "F"}
                    name="section"
                    value="women"
                    type="checkbox"
                  />
                  <span>Women</span>
                </label>
              </p>
            </div>
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
