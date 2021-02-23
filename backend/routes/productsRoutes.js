// import express from 'express'
import express from 'express'
// import axios from 'axios'
import axios from 'axios'

import {
  getProducts,
  getProductById,
} from '../controllers/productControllers.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router
