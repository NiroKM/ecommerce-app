import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, topRatedProductsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer'
import { userDetailReducer, userLoginReducer, userRegisterReducer, userProfileUpdateReducer, usersListReducer, usersDeleteReducer, userUpdateReducer } from './reducers/userReducer';
import { myOrderListReducer, orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducer';


const reducer = combineReducers({
    productList: productListReducer,
    topRatedProducts : topRatedProductsReducer,
    createProduct: productCreateReducer,
    updateProduct: productUpdateReducer,
    deleteProduct: productDeleteReducer,
    productDetails: productDetailReducer,
    productCreateReview:productCreateReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userProfileUpdate: userProfileUpdateReducer,
    usersList: usersListReducer,
    userDelete: usersDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    myOrderList: myOrderListReducer,
    orderList:orderListReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

