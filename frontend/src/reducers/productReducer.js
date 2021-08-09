import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_ERROR,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_ERROR,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_ERROR
} from "../constants/productConstant";

export const productListReducer = (state = {products:[]}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_ERROR:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}


export const productDetailReducer = (state = {product:{reviews:[]}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAIL_ERROR:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}


export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true};
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_ERROR:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}