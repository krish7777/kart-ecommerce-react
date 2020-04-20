// import React, { Component } from "react";

// import ProductCard from "../ProductCard/ProductCard";

// import { connect } from "react-redux";
// import { getProductsAsync } from "../../redux/products/productsActions";

// class Products extends Component {
//   componentDidMount() {
//     // firestore
//     //   .collection("products")
//     //   .get()
//     //   .then(prods => {
//     //     this.setState(
//     //       {
//     //         loaded: true,
//     //         products: prods.docs.map(pro => pro.data())
//     //       },
//     //       () => {
//     //         console.log(this.state);
//     //       }
//     //     );
//     //   });
//     this.props.getProducts();
//   }
//   render() {
//     return this.props.loaded ? (
//       this.props.products.map((prod) => (
//         <ProductCard product={prod}></ProductCard>
//       ))
//     ) : (
//       <h1>Loading</h1>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   products: state.products.products,
//   loaded: state.products.loaded,
// });

// const mapDispatchToProps = (dispatch) => ({
//   getProducts: () => dispatch(getProductsAsync()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Products);
