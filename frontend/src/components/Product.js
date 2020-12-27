import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({productItem}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${productItem._id}`}>
                <Card.Img src={productItem.image} variant="top" title={productItem.name}/>
            </a>

            <Card.Body>
                <a href={`/product/${productItem._id}`}>
                    <Card.Title>
                        <strong>{productItem.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text as='div'>
                    <div className='my-3'>
                        {productItem.rating} from {productItem.numReviews} reviews
                    </div>
                </Card.Text>

                <Card.Text as='h3'>
                    ${productItem.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
