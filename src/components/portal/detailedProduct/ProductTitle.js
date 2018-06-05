import React, { Component } from "react";
import ImageUploader from "../products/ImageUploader";


class ProductTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailedProductId: this.props.productId,
            name: this.props.productDetails.name,
            vendor: this.props.productDetails.vendorId
        }
        
    }
    render() {
        return (
            <div className="container parent-high">
                <div className="row align-items-start">

                    <div className="col pl-0">
                        <div className="productTitle">
                            <b className="d-inline">{this.state.name}</b><p className="d-inline dscrptnSize-9"> by {this.state.vendor}</p>
                        </div>
                        <div className="productRating">
                            <i className="d-inline fas fa-star fa-xs mr-1"/><p className="d-inline dscrptnSize-8">4.7</p>
                        </div>
                    </div>


                </div>
                <div className="row align-items-end mt-3 parent-high">
                    <ImageUploader />
                </div>
            </div>
        );
    }
}

export default ProductTitle;