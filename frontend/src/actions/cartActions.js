import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, EMPTY_CART } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const emptyCart = () => (dispatch)=>{
    dispatch({
        type:EMPTY_CART
    })

    localStorage.removeItem('cartItems')
}

export const saveShippingAddress = (data) => (dispatch) => {

    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))

}

export const savePaymentMethod = (paymentMethod) => (dispatch) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethod
    })

    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))

}

