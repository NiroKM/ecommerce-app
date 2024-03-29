import React, { useEffect } from 'react'
import { Table, Button, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createNewProduct, deleteProductFromList, listProducts } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'
import Paginate from '../components/Paginate'


const ProductListScreen = ({ history,match }) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products,pages,page } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const deleteProduct = useSelector(state => state.deleteProduct)
    const { success: deleteSuccess } = deleteProduct

    const createProduct = useSelector(state => state.createProduct)
    const { loading: createLoading, error: createError, product: createdProduct, success: createSuccess } = createProduct

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if ( !userInfo || !userInfo.isAdmin ) {
            history.push('/login')
        }

        if (createSuccess) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('',pageNumber))
        }

    }, [dispatch, history, userInfo, deleteSuccess, createSuccess, createdProduct,pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Do you want to delete this product')) {
            // DELETE PRODUCT
            dispatch(deleteProductFromList(id))
        }
    }

    const createProductHandler = () => {
        //Create Product
        dispatch(createNewProduct())
    }

    return (
        <div>
            <Row className='align-text-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {createLoading && <Loader />}
            {createError && <Message varient='danger'>{createError}</Message>}
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> : (
                <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'> </i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant={'danger'} className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true}/>
                </>
            )}
        </div>
    )
}

export default ProductListScreen
