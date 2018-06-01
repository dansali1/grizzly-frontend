import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchCategories,
        sortCategoriesByParam } from "../../../actions/categoryActions";
import CategoryForm from "../categories/CategoryForm";
class CategorySearchSort extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSortByName = this.onSortByName.bind(this);
    this.onSortByDescription = this.onSortByDescription.bind(this);
    this.onSortByCount = this.onSortByCount.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onSearch(e) {
    e.preventDefault();
    this.props.searchCategories(this.state.search);
    this.setState({ search: "" });
  }

  onSortByName(e) {
    e.preventDefault();
    this.props.sortCategoriesByParam("name");
  }

  onSortByDescription(e) {
    e.preventDefault();
    this.props.sortCategoriesByParam("description");
  }

  onSortByCount(e) {
    e.preventDefault();
    this.props.sortCategoriesByParam("count");
  }

  render() {
    const category = {
      name: "",
      description: ""
    };
    return (
      <div className="btn-group aligned-left mt-2 mb-2">
        <form onSubmit={this.onSearch} className="form-inline ml-0 mr-1">
          <div className="search-form-custom">
            <input
              className="form-control left-rounded border-right-0 border"
              type="search"
              name="search"
              placeholder="Search"
              value={this.state.search}
              onChange={this.onChange}
            />
            <span className="input-group-append-more">
              <button
                onClick={this.onSearch}
                className="btn btn-outline-success btn-sm right-rounded border-left-0 border"
                type="button"
              >
                <i className="fa fa-search" />
              </button>
            </span>
          </div>
        </form>
        <button
          type="button"
          className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort By
        </button>
        <div className="dropdown-menu">
          <button 
            className="dropdown-item" 
            type="button"
            onClick={this.onSortByName}>
            Name
          </button>
          <button 
            className="dropdown-item" 
            type="button"
            onClick={this.onSortByDescription}>
            Description
          </button>
          <button 
            className="dropdown-item" 
            type="button"
            onclick={this.onSortByCount}>
            Product Count
          </button>
        </div>
        <CategoryForm
          category={category}
          title="Add Category"
          buttonLabel="Add Category"
          actionLabel="Add Category"
        />
      </div>
    );
  }
}

CategorySearchSort.propTypes = {
  searchCategories: PropTypes.func.isRequired,
  sortCategoriesByParam: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { searchCategories, sortCategoriesByParam })(
  CategorySearchSort
);
