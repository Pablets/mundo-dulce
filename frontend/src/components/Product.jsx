import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <div className='my-3 p-3 rounded shadow d-flex justify-evenly flex-col'>
      <Link to={`/product/${product._id}`}>
        <div className='h-40 w-auto sm:h-56 overflow-hidden d-flex items-center'>
          <img
            src={product.image}
            alt='Paystation 4 pro'
            className='overflow-hidden d-block'
          />
        </div>
      </Link>
      <div className='p-0 mt-0'>
        <Link to={`/product/${product._id}`}>
          <div className='py-2 h-8 sm:h-14'>
            <strong className='font-semibold'>{product.name}</strong>
          </div>
        </Link>

        <div className='py-2'>
          <Rating
            value={product.rating}
            text={` ${product.numReviews} reviews`}
          />
        </div>
        <div className='pb-2'>
          <h3 className='text-lg font-semibold text-gray-500'>${product.price}</h3>
        </div>
      </div>
    </div>
  )
}

export default Product
