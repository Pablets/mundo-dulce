import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <div className='w-96'>
      <CheckoutSteps step1 step2 step3 />
      <div className='ml-16 sm:ml-0'>
        <h1 className='font-bold text-2xl pb-4 text-gray-600'>
          Método de pago
        </h1>
        <form onSubmit={submitHandler}>
          <div>
            <label className='text-base'>Seleccione método</label>
            <div className='flex flex-col'>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
              <Form.Check
                type='radio'
                label='Mercado Pago'
                id='MercadoPago'
                name='paymentMethod'
                value='MercadoPago'
                onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
            </div>
          </div>
          <div className='pt-4'>
            <button
              type='submit'
              className='text-xl bg-gray-500 py-2 px-4 rounded-full text-white'>
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentScreen
