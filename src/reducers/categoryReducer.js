import * as types from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  categories: null,
  hasMore: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.GET_CATEGORIES:
      const hasMore =
        action.payload.length < 25 || isEmpty(action.payload.length)
          ? false
          : true;
      const currentCats = isEmpty(state.categories) ? [] : state.categories;
      const newCats = isEmpty(action.payload)
        ? currentCats
        : currentCats.concat(action.payload);
      return {
        ...state,
        categories: newCats,
        hasMore: hasMore,
        loading: false
      };
    case types.CATEGORY_ADDING:
      return {
        ...state,
        loading: true
      };
    case types.CATEGORY_EDITING:
      return {
        ...state,
        loading: true
      };
    case types.CATEGORY_EDITED:
      return {
        ...state,
        categories: state.categories.map(
          cat =>
            cat.categoryId === action.payload.categoryId ? action.payload : cat
        ),
        loading: false
      };
    case types.CATEGORY_DELETING:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.categoryId !== action.payload
        )
      };
    case types.CLEAR_CURRENT_CATEGORIES:
      return {
        ...state,
        categories: null
      };
    default:
      return state;
  }
}
