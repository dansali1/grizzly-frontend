import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import isEmpty from "../../../validation/is-empty";
import unavailable from "../../../img/unavailable.png";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import { getProductWithImgs } from "../../../actions/productsActions";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      totalprice: 0
    };
    this.onChange = this.onChange.bind(this);
  }
  getImg(product) {
    let imgInfo = this.props.product.images[product.productId][0];
    return (
      <img
        key={product.productId}
        src={imgInfo.base64Image}
        className="img-responsive"
        alt=""
        style={{ width: "150px", height: "150px" }}
      />
    );
  }

  onChange(e) {
    console.log("inside onchange");
    this.setState({
      [e.target.name]: e.target.value
      // totalprice: this.state.quantity*this.state.price
    });

    console.log(e.target.name);
    console.log(e.target.value);
  }

  onClick = event => {
    this.setState({ clicks: this.state.value - 1 });
    console.log(this.clicks);
  };
  showImg(product) {
    // If we don't have any images.
    if (isEmpty(this.props.product.images[product.productId])) {
      // If the product details has no images.
      if (isEmpty(product.imageDTO)) {
        return (
          <img
            src={unavailable}
            className="img-responsive"
            style={{ width: "150px", height: "150px" }}
            alt="Unavailable"
          />
        );
        // We have image but its loading, so wait.
      } else {
        return <Spinner size={"150px"} />;
      }
      // Return the loaded image.
    } else {
      return this.getImg(product);
    }
  }
  show() {
    const products = JSON.parse(localStorage.getItem("cart"));
    return products.map(prod => (
      <div key={prod.productId}>
        <div className="row-8 d-inline products-information">
          <div className="col-3 ml-5 d-inline products-image">
            <Link
              className="align-content-center"
              to={`/customerdetailedproduct/${prod.productId}`}
            >
              {" "}
              {this.showImg(prod)}
            </Link>
          </div>
          <div className="col-6 d-inline product-price-quantity align-right">
            <h6 className="d-inline ml-5">{prod.name}</h6>
            <ul className="d-inline">
              <li id="price" className="d-inline mr-3">
                $ {prod.price}
              </li>
              <li className="d-inline">
                <input
                  name="quantity"
                  className="quantity-select"
                  value="1"
                  min="1"
                  max="50"
                  maxLength="2"
                  type="number"
                  onChange={this.onChange}
                />
              </li>
            </ul>
          </div>
          <div align="right" className="col-2 d-inline product-total-price ">
            <p id="totalprice" className="d-inline">
              {" "}
              A$ {this.totalprice}
            </p>
          </div>
          <div className="col-1 d-inline remove-btn">
            <button
              className=" d-inline more-rounded hover-w-b fas fa-times"
              onClick={this.removeItem}
            />
          </div>
        </div>
        <hr width="100%" />
      </div>
    ));
  }

  render() {
    return (
      <div className="shopping cart">
        <div className="row-2 mt-8 items-in-cart">
          <h2 className="ml-5">Items in Your Cart</h2>
          <hr width="100%" />
        </div>
        <div>{this.show()}</div>
        <div align="right" className="row-2 d-inline checkout-btn div-checkout">
          <Link
            className="d-inline btn continue-btn more-rounded btnCheckOutCart "
            to="/customer"
          >
            {" "}
            Continue Shopping
          </Link>
          <Link
            className="d-inline ml-3 checkout-btn more-rounded btnCheckOutCart"
            to="/payment"
          >
            Checkout
          </Link>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  getProductWithImgs: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  product: state.product,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getProductWithImgs }
)(withRouter(ShoppingCart));
