import axios from "axios";
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
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
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
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const deleteProductFromList = (id) =>async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })

        const {userLogin} = getState()
        const {userInfo} = userLogin

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const data = await axios.delete(`/api/products/${id}`,config)
        
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_DELETE_ERROR,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}