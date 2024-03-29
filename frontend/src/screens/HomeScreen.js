import { React, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Loader } from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'



const HomeScreen = ({ match }) => {

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { products, loading, error, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber])

    return (
        <>
        <Meta/>
        <div>
            {!keyword ? <ProductCarousel/>:(<Link className='btn btn-dark my-3' to='/'>Go Back</Link>)}
            <h1>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message varient='danger'>{error}</Message>
                    :
                    <>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product productItem={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </>
            }

        </div>
        </>
    )
}

export default HomeScreen
