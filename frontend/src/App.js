import Footer from "./components/Footer";
import Header from "./components/Header";
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";



const App=()=> {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main className='py-3'>
          <Container>
            <Route path='/' component={HomeScreen} exact/>
            <Route path='/product/:id' component={ProductScreen} exact/>
          </Container>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
