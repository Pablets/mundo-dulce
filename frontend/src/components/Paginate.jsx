import React from 'react'
// import { Pagination } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div>
        {[...Array(pages).keys()].map(x => (
          <NavLink
            activeClassName='text-white bg-pink-500 no-underline'
            className='rounded-full inline-block h-11 w-11 text-center p-1 mx-1 text-white bg-gray-500 no-underline shadow-sm'
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }>
            <span className='py-3 text-2xl font-semibold text-center'>
              {x + 1}
            </span>
          </NavLink>
        ))}
      </div>
    )
  )
}

export default Paginate
