import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productActions'
import Message from './Message'
import Loader from './Loader'


const ProductCarousel = () => {

    const dispatch = useDispatch()
    const topRatedProducts = useSelector(state => state.topRatedProducts)
    const { loading, error, products } = topRatedProducts
    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name}/>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
