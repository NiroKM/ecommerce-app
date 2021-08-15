import React, { useEffect } from 'react'
import { Table, Button, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAllOrders, getOrderDetails } from '../actions/orderActions'


const OrderListScreen = ({ history }) => {

    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        } else {
            dispatch(getAllOrders())
        }
    }, [dispatch, history, userInfo])

    const deleteHandler = () => {
        console.log('delete item')
    }

    const orderRequestHandler=(id)=>{
        dispatch(getOrderDetails(id))
    }

    return (
        <div>
            <Row className='align-text-center'>
                <Col>
                    <h1>Orders</h1>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>PRICE</th>
                            <th>USER</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.user.name}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>{order.isDeleivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button onClick={() => orderRequestHandler(order._id)} className='btn-sm' varient='light'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                    <span> </span>
                                    <Button variant={'danger'} className='btn-sm' onClick={() => deleteHandler(order._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListScreen
