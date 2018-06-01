import {
    GET_PRODUCTS,
    PRODUCTS_LOADING,
    PRODUCT_ADDING,
    GET_ERRORS
} from "./types";
import { GET_PRODUCTS, PRODUCTS_LOADING } from "./types";
import { PRODUCT_API_GATEWAY } from "./microservices";
import axios from "axios";

// Get Product List
export const getProducts = index => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(PRODUCT_API_GATEWAY + `/get/${index}/default`)
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: {}
      })
    );
};

export const setProductAdding = () =>{
    return{
        type: PRODUCT_ADDING
    };
};

export const addProduct = newProd => dispatch => {
    dispatch(setProductLoading());
    axios
      .put(PRODUCT_API_GATEWAY + "/add", newProd)
      .then(res => dispatch(getProducts()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: {}
        })
      );
  };

// Product Loading
export const setProductLoading = () => {
  return {
    type: PRODUCTS_LOADING
  };
};


