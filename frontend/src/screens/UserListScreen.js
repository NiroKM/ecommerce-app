import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteUserFromList, getUsersList } from '../actions/userActions'

const UserListScreen = ({ history }) => {

    const dispatch = useDispatch()
    const usersList = useSelector(state => state.usersList)
    const { loading, error, users } = usersList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: deleteSuccess } = userDelete



    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getUsersList())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, deleteSuccess])

    const deleteHandler = (id) => {
        if (window.confirm('Do you want to delet this user')) {
            dispatch(deleteUserFromList(id))
        }
    }

    return (
        <div>
            <Row className='align-text-center'>
                <Col>
                    <h1>Users</h1>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'> </i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant={'danger'} className='btn-sm' onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen
