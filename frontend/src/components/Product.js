import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'


const Product = ({productItem}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${productItem._id}`}>
                <Card.Img src={productItem.image} variant="top" title={productItem.name}/>
            </Link>

            <Card.Body>
                <Link to={`/product/${productItem._id}`}>
                    <Card.Title>
                        <strong>{productItem.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating 
                        value={productItem.rating} 
                        text={`${productItem.numReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as='h3'>
                    ${productItem.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
