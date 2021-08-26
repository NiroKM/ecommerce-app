import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader'
import Message from '../components/Message'
import { createProductReviewAction, listProductsDetail } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstant'
import Meta from '../components/Meta'



const ProductScreen = ({ history, match }) => {

    const [qty, setqty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, product, error } = productDetails;

    const productCreateReview = useSelector(state => state.productCreateReview);
    const { success: createReviewSuccess, error: createReviewError } = productCreateReview;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (createReviewSuccess) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductsDetail(match.params.id))
    }, [match.params.id, dispatch, createReviewSuccess])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReviewAction(match.params.id, {
            rating,
            comment
        }))

    }

    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ? <Loader />
                : error ? <Message varient='danger'>{error}</Message>
                    : (
                        <>
                        <Meta title={product.name}/>
                            <Row>
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
                                            {product.countInStock > 0 &&
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col>
                                                            Qty
                                                        </Col>
                                                        <Col>
                                                            <Form.Control className="qty-select" as='select' value={qty} onChange={(e) =>
                                                                setqty(e.target.value)
                                                            }>
                                                                {[...Array(product.countInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
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
                            <Row>
                                <Col md={6}>
                                    <h2>Reviews</h2>
                                    {product.reviews.length === 0 ? <Message> No Reviews</Message> : (
                                        <ListGroup variant='flush'>
                                            {
                                                product.reviews.map((review) => (
                                                    <ListGroup.Item key={review._id}>
                                                        <strong>{review.name}</strong>
                                                        <Rating value={review.rating} />
                                                        <p>{review.createdAt.substring(0, 10)}</p>
                                                        <p>{review.comment}</p>
                                                    </ListGroup.Item>
                                                ))
                                            }
                                        </ListGroup>
                                    )}
                                    <ListGroup.Item>
                                        <h2>Write a Customer Review</h2>
                                        {createReviewError && <Message varient='danger'>{createReviewError}</Message>}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                        <option value=''>Select ...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control as='textarea' value={comment} onChange={(e) => setComment(e.target.value)}>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button type='submit' variant='primary'>Submit</Button>
                                            </Form>
                                        ) : (<Message>Please <Link to={`/login?redirect=product/${match.params.id}`}>sign in </Link>to write review </Message>)}
                                    </ListGroup.Item>
                                </Col>
                            </Row>
                        </>
                    )
            }
        </div>
    )
}

export default ProductScreen
