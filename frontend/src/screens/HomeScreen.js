import {React,useState,useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios';

const HomeScreen = () => {

    const [products,setProducts]=useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            const products = await axios.get('/api/products');
            setProducts(products.data);
        }
        fetchData();
    },[])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product productItem={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen