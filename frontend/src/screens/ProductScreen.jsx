import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  })

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Review submitted')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <div>
      {isDesktop && (
        <>
          <Link className='shadow btn btn-light my-3' to='/'>
            Atras
          </Link>
        </>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className=''>
          <Meta title={product.name} />
          <div className='p-0 m-0 grid grid-cols-1 sm:grid-cols-2 sm:gap-7'>
            {/* Image */}
            <div className='grid sm:col-start-1 pb-4'>
              {!product.image ? (
                <Spinner animation='border' role='status'>
                  <span className='sr-only'>Loading...</span>
                </Spinner>
              ) : (
                <img
                  className='shadow'
                  src={product.image}
                  alt={product.name}
                />
              )}
            </div>
            {/* Description */}
            <div className='grid sm:col-start-2 sm:w-96 sm:ml-8 pb-4'>
              <ul className='pb-4 px-3'>
                <li className='pb-4'>
                  <h3 className='text-2xl text-gray-500 font-semibold'>
                    {product.name}
                  </h3>
                </li>
                <li className='pb-4 text-base text-gray-400'>
                  <Rating
                    value={product.rating}
                    text={` ${product.numReviews} reviews`}
                  />
                </li>
                <li className='pb-4 text-xl'>Price: ${product.price}</li>
                <li>Description {product.description}</li>
              </ul>
              <div>
                <Card>
                  <ListGroup className='pt-4 pt-md-0' variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col> Status: </Col>
                        <Col>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out of stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={e => setQty(e.target.value)}>
                              {[...Array(product.countInStock).keys()].map(
                                x => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}>
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            </div>
            {/* Characteristics */}
            <div className='grid sm:col-start-1 sm:w-96 sm:ml-8 px-3 sm:px-0'>
              <div className='pb-4 px-2 sm:px-0'>
                <h3 className='text-2xl text-gray-500 font-semibold'>
                  Características
                </h3>
              </div>
            </div>
            {/* Reviews */}
            <div className='grid sm:col-start-2 sm:w-96 sm:ml-8 px-3'>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && (
                    <Message>No reviews</Message>
                  )}
                </ListGroup.Item>

                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e =>
                            setComment(e.target.value)
                          }></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Sign in</Link>to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductScreen
