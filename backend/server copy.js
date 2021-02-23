import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import products from './data/products.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send(console.log('Api online'))
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res)=> {
  const product = products.find(p = p.name === req.params.id)
  res.json(product)
})



if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000
const ENVIROMENT = process.env.NODE_ENV || 'development'

app.listen(PORT, () => {
  console.log(
    '\u2705',
    ` App running in ${ENVIROMENT} mode on port: ${PORT} `.green.inverse.bold
  )
})
