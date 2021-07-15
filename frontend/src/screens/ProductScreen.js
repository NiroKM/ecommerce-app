import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader'
import Message from '../components/Message'
import { listProductsDetail } from '../actions/productActions'



const ProductScreen = ({ history,match }) => {

    const [qty,setqty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, product, error } = productDetails;

    useEffect(() => {
        dispatch(listProductsDetail(match.params.id))
    }, [match.params.id, dispatch])

    const addToCartHandler = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ? <Loader /> 
            : error ? <Message varient='danger'>{error}</Message> 
            :   <Row>
                    <Col md={4}>
                        <Image src={product.image} alt={product.name} fluid></Image>
                    </Col>
                    <Col md={4} >
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: ${product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                {product.description}
                            </ListGroupItem> 
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup varient="flush">
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                {product.countInStock> 0  &&
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                Qty
                                            </Col>
                                            <Col>
                                                <Form.Control className="qty-select" as='select' value={qty} onChange={(e)=>
                                                    setqty(e.target.value)
                                                }>
                                                    {[...Array(product.countInStock).keys()].map(x=>(
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem> 
                                }
                                <ListGroupItem>
                                    <Button 
                                    onClick={addToCartHandler}
                                    className='btn-block' 
                                    type='button' 
                                    disabled={product.countInStock === 0}>
                                        Add To Cart
                                </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default ProductScreen
