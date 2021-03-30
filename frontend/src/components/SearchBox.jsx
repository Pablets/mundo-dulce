import React, { useState } from 'react'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className='rounded-full bg-gray-50 flex flex-row justify-between'
    >
      <input
        className='bg-transparent px-3 text-1xl text-gray-800 focus:outline-none'
        placeholder='Buscar en mundo dulce'
        aria-label='Search'
        aria-describedby='Search'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type='submit'
        className='rounded-full bg-transparent py-0 pr-3 focus:outline-none'
      >
        <i className='fas fa-search text-gray-500 hover:text-gray-800 bg-transparent text-2xl m-0 p-0'></i>
      </button>
    </form>
  )
}

export default SearchBox
