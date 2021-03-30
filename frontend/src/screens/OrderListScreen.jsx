import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <div className='pl-3'>
      <h1 className='text-2xl py-2'>Ordenes</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th className='font-light text-xs text-gray-900 align-text-top'>USUARIO</th>
              <th className='font-light text-xs text-gray-900 align-text-top'>
                FECHA DE CREACIÓN
              </th>
              <th className='font-light text-xs text-gray-900 align-text-top'>DETALLES</th>
              <th className='font-light text-xs text-gray-900 align-text-top'>PAGO</th>
              <th className='font-light text-xs text-gray-900 align-text-top'>ENTREGA</th>
              <th className='font-light text-xs text-gray-900 align-text-top'>TOTAL</th>
              <th className='font-light text-xs text-gray-900 align-text-top'>ID</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Detalles
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <div className='d-flex items-center justify-center'>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times text-red-700 text-xl'></i>
                    )}
                  </div>
                </td>
                <td>
                  <div className='d-flex items-center justify-center'>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times text-red-700 text-xl'></i>
                    )}
                  </div>
                </td>
                <td>{order.totalPrice}</td>
                <td>{order._id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default OrderListScreen
