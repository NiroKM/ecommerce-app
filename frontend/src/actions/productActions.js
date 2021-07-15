import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_ERROR,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_ERROR
} from "../constants/productConstant";

export const listProducts = () =>async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_LIST_REQUEST
        })
        const {data} = await axios.get('/api/products');
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_ERROR,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const listProductsDetail = (id) =>async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_DETAIL_REQUEST
        })
        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_DETAIL_ERROR,
            payload:error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}