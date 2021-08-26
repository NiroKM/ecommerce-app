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
    PRODUCT_DELETE_ERROR,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_ERROR,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_ERROR,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_ERROR,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_ERROR
} from "../constants/productConstant";

export const listProducts = (keyword='',pageNumber='') =>async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_LIST_REQUEST
        })
        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
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

export const createNewProduct = () => async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_CREATE_REQUEST
        })

        const {userLogin} = getState()
        const {userInfo} = userLogin

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const data = await axios.post(`/api/products/`,{},config)
        
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data.data
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_CREATE_ERROR,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateSelectedProduct = (product) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_UPDATE_REQUEST
        })

        const {userLogin} = getState()
        const {userInfo} = userLogin

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const data = await axios.put(`/api/products/${product._id}`,product,config)
        
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data.data
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_UPDATE_ERROR,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProductReviewAction = (productId, review) => async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {userLogin} = getState()
        const {userInfo} = userLogin

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products/${productId}/reviews`,review,config)
        
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_CREATE_REVIEW_ERROR,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listTopProducts = () =>async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_TOP_REQUEST
        })
        const {data} = await axios.get(`/api/products/top`);
        dispatch({
            type:PRODUCT_TOP_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:PRODUCT_TOP_ERROR,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}