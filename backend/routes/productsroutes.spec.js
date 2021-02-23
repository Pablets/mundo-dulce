const express = require('express')
// import { getProducts } from '../controllers/productControllers.js'
const { getProducts } = require('../controllers/productControllers.js')
// import axios from 'axios'
const axios = require('axios')

jest.mock('axios')

it('returns all the products', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        userId: 1,
        id: 1,
        title: 'My First Album',
      },
      {
        userId: 1,
        id: 2,
        title: 'Album: The Sequel',
      },
    ],
  })

  const title = await getProducts()
  expect(title).toEqual(`
        userId: 1,
        id: 1,
        title: 'My First Album'
      },
      {
        userId: 1,
        id: 2,
        title: 'Album: The Sequel'
      }`)
})
