import React, { useEffect } from 'react'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, makePayment } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const OrderScreen = ({ match, history }) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)

    const { orderItems, loading, error } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const paymentHandler = () => {
        console.log('pay')
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(getOrderDetails(orderId))
        } else {
            history.push(`/login?redirect=order/${orderId}`)
        }
    }, [dispatch,userInfo,orderId,history])

    return (
        <div>
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> :
                <div>
                    <h2>Order {orderId}</h2>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>

                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p><strong>Name: </strong> {orderItems.user.name}</p>
                                    <p><strong>Email: </strong> <a href={`mailto:${orderItems.user.email}`}>{orderItems.user.email}</a></p>
                                    <p>
                                        <strong>Address: </strong>
                                        {orderItems.shippingAddress.address},
                                        {orderItems.shippingAddress.city},
                                        {orderItems.shippingAddress.postalCode},
                                        {' ' + orderItems.shippingAddress.country}
                                    </p>
                                    {orderItems.isDeleivered ? <Message varient='success'>Delivered on {orderItems.deliveredAt}</Message> :
                                        <Message varient='danger'>Not Delivered</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p><strong>Method: </strong>
                                        {orderItems.paymentMethod}</p>
                                    {orderItems.isPaid ? <Message varient='success'>Paid on {orderItems.paidAt}</Message> :
                                        <Message varient='danger'>Not Paid</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {orderItems.orderItems.length === 0 ? <Message>Your order is empty</Message> : (
                                        <ListGroup variant='flush'>
                                            {orderItems.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={2}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col className="mt-1">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col className="mt-1" md={5}>
                                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${orderItems.itemPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${orderItems.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${orderItems.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${orderItems.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button type='button' className='btn-block' onClick={paymentHandler}>Pay</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    )
}

export default OrderScreen
