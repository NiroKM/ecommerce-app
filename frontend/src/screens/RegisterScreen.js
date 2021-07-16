import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


const RegisterScreen = ({location,history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const userLogin = useSelector(state => state.userLogin)
    const userLoginInfo = userLogin.userInfo  
    const {loading,error,userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1]:'/'

    useEffect(()=>{
        if(userLoginInfo){
            if(userInfo){
                history.push(redirect)
            }
        }
    },[history, userInfo, redirect])

    const submitHandler = (e)=>{
        e.preventDefault()
        //dispatch
        if(password!== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name,email,password))
        } 
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message varient = 'danger'>{error}</Message>}
            {message && <Message varient = 'danger'>{message}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3 px-3'>
                Have an account?<Link className='mx-2' to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log In</Link>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
