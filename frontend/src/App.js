import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";



const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/register' component={RegisterScreen} exact />
            <Route path='/login' component={LoginScreen} exact />
            <Route path='/profile' component={ProfileScreen} exact />
            <Route path='/product/:id' component={ProductScreen} exact />
            <Route path='/cart/:id?' component={CartScreen} exact />
            <Route path='/order/:id' component={OrderScreen} exact />
            <Route path='/shipping' component={ShippingScreen} exact />
            <Route path='/payment' component={PaymentScreen} exact />
            <Route path='/placeorder' component={PlaceOrderScreen} exact />
            <Route path='/admin/userlist' component={UserListScreen} exact />
            <Route path='/admin/productlist' component={ProductListScreen} exact />
            <Route path='/admin/productlist/page/:pageNumber' component={ProductListScreen} exact />
            <Route path='/admin/orderlist' component={OrderListScreen} exact />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} exact />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
            <Route path='/search/:keyword' component={HomeScreen} exact/>
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
