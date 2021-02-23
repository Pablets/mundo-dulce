// import asyncHandler from 'express-async-handler'
import asyncHandler from 'express-async-handler'
// import products from '../data/products.js'
import products from '../data/products.js'

const getProducts = asyncHandler(async (req, res) => {
  res.json(products)
})

const getProductById = asyncHandler((req, res) => {
  const product = products.find((p) => p._id === req.params.id)

  if (product) {
    console.log('consulta ok')
    console.log(product)
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
    console.error('No se encontró el producto')
  }
})

export { getProducts, getProductById }
