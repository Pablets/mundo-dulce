import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <div className='my-3 rounded-md overflow-hidden shadow d-flex justify-evenly flex-col ring-offset-gray-900'>
      <Link to={`/product/${product._id}`}>
        <div className='h-52 w-auto sm:h-56 overflow-hidden d-flex items-center'>
          <img
            src={product.image}
            alt='Paystation 4 pro'
            className='overflow-hidden d-block'
          />
        </div>
      </Link>
      <div className='px-3 mt-0'>
        <Link to={`/product/${product._id}`}>
          <div className='py-2 max-h-14 sm:h-14'>
            <strong className='font-semibold text-lg text-gray-700'>{product.name}</strong>
          </div>
        </Link>

        <div className='py-2 text-gray-400'>
          <Rating
            value={product.rating}
            text={` ${product.numReviews} reviews`}
          />
        </div>
        <div className='pb-2'>
          <h3 className='text-lg font-semibold text-blue-400'>${product.price}</h3>
        </div>
      </div>
    </div>
  )
}

export default Product
