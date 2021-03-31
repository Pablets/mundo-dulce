import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const { register, handleSubmit, errors } = useForm()

  const dispatch = useDispatch()

  const onSubmit = ({ address, city, postalCode, country }) => {
    // console.log(address, city, postalCode, country)
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <div className='sm:w-96'>
      <div>
        <CheckoutSteps step1 step2 />
        <h1 className='font-bold text-2xl pb-4 text-gray-600'>Shipping</h1>
        <form
          className='rounded-sm p-2 shadow-lg'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <label className='text-base'>Dirección</label>
            <input
              className='bg-gray-100 rounded-sm p-2 text-base'
              type='text'
              placeholder='Dirección'
              name='address'
              defaultValue={shippingAddress.address || ''}
              ref={register({ required: true })}></input>
            {errors.direction && <span>This field is required</span>}
          </div>
          <div className='flex flex-col'>
            <label className='text-base'>Ciudad</label>
            <input
              className='bg-gray-100 rounded-sm p-2 text-base'
              type='text'
              placeholder='Ciudad'
              name='city'
              defaultValue={shippingAddress.city || ''}
              ref={register({ required: true })}></input>
            {errors.city && <span>This field is required</span>}
          </div>
          <div className='flex flex-col'>
            <label className='text-base'>Código postal</label>
            <input
              className='bg-gray-100 rounded-sm p-2 text-base'
              type='text'
              placeholder='Código postal'
              name='postalCode'
              defaultValue={shippingAddress.postalCode || ''}
              ref={register({ required: true })}></input>
            {errors.postalCode && <span>This field is required</span>}
          </div>
          <div className='flex flex-col'>
            <label className='text-base'>País</label>
            <input
              className='bg-gray-100 rounded-sm p-2 text-base'
              type='text'
              placeholder='País'
              name='country'
              defaultValue={shippingAddress.country || ''}
              ref={register({ required: true })}></input>
            {errors.country && <span>This field is required</span>}
          </div>
          <div className='py-3'>
            <button
              type='submit'
              className='bg-gray-500 text-lg py-2 px-4 rounded-full text-white'>
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShippingScreen
