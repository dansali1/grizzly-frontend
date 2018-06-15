import React, { Component } from "react";
import { Row, Col, Nav, NavItem } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Profile from "../profile/Profile";
import CustomerProductDescription from "./CustomerProductDescription";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import isEmpty from "../../../validation/is-empty";
import { getProductWithImgs } from "../../../actions/productsActions";
class CustomerDetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
    this.props.getProductWithImgs(this.props.match.params.productId);
  }

  show() {
    const { single, loading, product_vendor } = this.props.product;
    if (isEmpty(single) || isEmpty(product_vendor) || loading) {
      return <Spinner />;
    } else {
      const vendor = this.props.product.product_vendor.filter(
        item => item.vendorId === single[0].vendorId
      )[0];
      return (
        <div>
          <CustomerProductDescription
            single={single[0]}
            history={this.props.history}
            vendor={vendor}
          />
        </div>
      );
    }
  }

  render() {
    return <div className="row">{this.show()}</div>;
  }
}

CustomerDetailedProduct.propTypes = {
  getProductWithImgs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProductWithImgs }
)(CustomerDetailedProduct);
