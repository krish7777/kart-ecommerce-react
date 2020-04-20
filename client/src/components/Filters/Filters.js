import React from "react";
import "./Filters.css";

import M from "materialize-css";

import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import { firestore } from "../../firebase/firebase";
import ProductCard from "../ProductCard/ProductCard";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.categories[0],
      sortOrder: "asc",
      priceRange: 500,
      sizes: {
        XL: false,
        L: false,
        M: false,
        S: false,
      },
      loaded: false,
      products: [],
    };
  }

  componentDidMount() {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems);
    firestore
      .collection("products")
      .where("gender", "==", this.props.gender)
      .get()
      .then((prods) => {
        this.setState(
          {
            products: prods.docs.map((pro) => pro.data()),
          },
          () => {
            this.setState({ loaded: true });
          }
        );
      });
  }

  handleSubmit = () => {
    console.log("submit clicked");
    this.setState({ loaded: false });
    const { sortOrder, priceRange, sizes, category } = this.state;
    // let genderArray = [];
    // if (gender.M) genderArray.push("M");
    // if (gender.F) genderArray.push("F");

    let sizesArray = [""];
    if (sizes.XL) sizesArray.push("XL");
    if (sizes.L) sizesArray.push("L");
    if (sizes.M) sizesArray.push("M");
    if (sizes.S) sizesArray.push("S");

    firestore
      .collection("products")
      .where("gender", "==", this.props.gender)
      .where("sizes", "array-contains-any", sizesArray)
      .where("category", "==", category)
      .where("price", "<=", priceRange)

      .orderBy("price", sortOrder)
      .get()
      .then((prods) => {
        this.setState(
          {
            products: prods.docs.map((pro) => pro.data()),
          },
          () => {
            console.log("products loaded");
          }
        );
      })
      .then(() => {
        this.setState({ loaded: true });
      })
      .catch((err) => {
        console.log("error happened");
        console.log(err);
      });
  };

  handleSort = (order) => {
    if (order === "low") this.setState({ sortOrder: "asc" });
    else
      this.setState({ sortOrder: "desc" }, () => {
        console.log(this.state);
      });
  };

  handlePriceRange = (range) => {
    if (range === 10) this.setState({ priceRange: 100 });
    else if (range === 55) this.setState({ priceRange: 500 });
    else this.setState({ priceRange: 1000 });
  };

  handleCategory = (category) => {
    this.setState({
      category,
    });
  };

  handleSizes = (size) => {
    if (size === "XL") {
      this.setState((prevState) => {
        return {
          sizes: {
            ...prevState.sizes,
            XL: !prevState.sizes.XL,
          },
        };
      });
    } else if (size === "L") {
      this.setState((prevState) => {
        return {
          sizes: {
            ...prevState.sizes,
            L: !prevState.sizes.L,
          },
        };
      });
    } else if (size === "M") {
      this.setState((prevState) => {
        return {
          sizes: {
            ...prevState.sizes,
            M: !prevState.sizes.M,
          },
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          sizes: {
            ...prevState.sizes,
            S: !prevState.sizes.S,
          },
        };
      });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="products-page--wrapper">
        <div className="filter-header">
          <div>
            <p>Shop By Category</p>
            <button className="dropdown-trigger btn" data-target="dropdown2">
              {this.state.category}
            </button>
            <ul id="dropdown2" className="dropdown-content">
              <li>
                <span
                  onClick={() => {
                    this.handleCategory(this.props.categories[0]);
                  }}
                >
                  {this.props.categories[0]}
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    this.handleCategory(this.props.categories[1]);
                  }}
                >
                  {this.props.categories[1]}
                </span>
              </li>
            </ul>
          </div>
          <div className="seperator"></div>
          <div>
            <p>Sort By Price</p>
            <button className="dropdown-trigger btn" data-target="dropdown1">
              {this.state.sortOrder === "asc" ? "Low to High" : "High to Low"}
            </button>
            <ul id="dropdown1" className="dropdown-content">
              <li>
                <span
                  onClick={() => {
                    this.handleSort("low");
                  }}
                >
                  Low to High
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    this.handleSort("high");
                  }}
                >
                  High to Low
                </span>
              </li>
            </ul>
          </div>
          <div className="seperator"></div>
          <div style={{ width: "90%" }}>
            <p>Price</p>
            <Slider
              min={10}
              defaultValue={55}
              marks={{ 10: 100, 55: 500, 100: 1000 }}
              step={null}
              handleStyle={{
                backgroundColor: "#ed7569",
                border: "none",
                top: "0",
              }}
              railStyle={{ backgroundColor: "#5B596A" }}
              dotStyle={{ display: "none" }}
              trackStyle={{ backgroundColor: "#ed7569" }}
              onAfterChange={(x) => {
                this.handlePriceRange(x);
              }}
            />
          </div>
          <div className="seperator"></div>
          <div>
            <p>Size</p>
            <div className="sizes-selector">
              <div
                className={`valign-wrapper boxes show${this.state.sizes.XL}`}
                onClick={() => this.handleSizes("XL")}
              >
                <div className="center-align">XL</div>
              </div>
              <div
                className={`valign-wrapper boxes show${this.state.sizes.L}`}
                onClick={() => this.handleSizes("L")}
              >
                <div className="center-align">L</div>
              </div>
              <div
                className={`valign-wrapper boxes show${this.state.sizes.M}`}
                onClick={() => this.handleSizes("M")}
              >
                <div className="center-align">M</div>
              </div>
              <div
                className={`valign-wrapper boxes show${this.state.sizes.S}`}
                onClick={() => this.handleSizes("S")}
              >
                <div className="center-align">S</div>
              </div>
            </div>
          </div>
          <div className="seperator"></div>
          <div>
            <button
              className="btn waves-effect waves-light "
              onClick={this.handleSubmit}
            >
              Apply changes
            </button>
          </div>
        </div>
        <div className=" products-list">
          {!this.state.loaded ? (
            <h1>Loading</h1>
          ) : this.state.products.length === 0 ? (
            <h6>No products. Please refine your filters</h6>
          ) : (
            this.state.products.map((prod) => (
              <ProductCard product={prod} key={prod.name}></ProductCard>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Filters;
