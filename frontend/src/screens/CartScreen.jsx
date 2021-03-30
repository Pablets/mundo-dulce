import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Form, Container } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useMediaQuery } from 'react-responsive'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  })

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Container className=''>
      <div>
        <div className='py-2'>
          <h1 className='text-2xl'>Carrito de compras</h1>
        </div>
      </div>
      <div>
        <div md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Tu carrito está vacio{' '}
              <Link to='/'>
                <span className='font-semibold underline'>Atras</span>
              </Link>
            </Message>
          ) : (
            <ul variant='flush'>
              {cartItems.map(item => (
                <li key={item.product}>
                  {isDesktop ? (
                    //
                    //  mdesktop version
                    //
                    <div className='pb-10'>
                      <div className='d-flex'>
                        <div>
                          <img
                            className='w-36 sm:w-40'
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className='text-base sm:text-3xl underline pl-3 max-w-sm'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className='font-semibold pt-2 sm:text-3xl pl-3 max-w-sm w-1/4'>
                          <p>Precio: ${item.price}</p>
                        </div>
                        <div className='w-1/6 pl-3 max-w-xs'>
                          <Form.Control
                            className=''
                            as='select'
                            value={item.qty}
                            onChange={e =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }>
                            {[...Array(item.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </div>
                        <div className='ml-20'>
                          <button
                            className=''
                            type='button'
                            onClick={() => removeFromCartHandler(item.product)}>
                            <i className='text-2xl fas fa-trash'></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    //
                    //  mobile version
                    //
                    <div className=''>
                      <div className='d-flex'>
                        <div>
                          <img
                            className='w-36 sm:w-80'
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className='pl-3'>
                          <div className='text-base sm:text-3xl underline'>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className='font-semibold pt-2 sm:text-3xl'>
                            <p>Precio: ${item.price}</p>
                          </div>
                        </div>
                      </div>
                      <div className='d-flex justify-end'>
                        <div className='mr-20'>
                          <button
                            className=''
                            type='button'
                            onClick={() => removeFromCartHandler(item.product)}>
                            <i className='text-lg fas fa-trash'></i>
                          </button>
                        </div>
                        <div className='pb-4'>
                          <Form.Control
                            className=''
                            as='select'
                            value={item.qty}
                            onChange={e =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }>
                            {[...Array(item.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div>
            <ul variant='flush'>
              <li>
                <h2 className='text-2xl'>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) productos
                </h2>
                <h2 className='text-2xl'>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h2>
              </li>
              <li className='pt-4'>
                <button
                  type='button'
                  className='bg-gray-500 text-lg py-2 px-4 rounded-full text-white'
                  disabled={cartItems.legth === 0}
                  onClick={checkoutHandler}>
                  Iniciar compra
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CartScreen
