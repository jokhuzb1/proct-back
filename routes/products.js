import express from 'express';
const router = express.Router();
import { Product } from '../models/product.js';

router.get('/', async (req, res) => {
  console.log(req.body)
  const options = {
    maxprice: req.body.maxprice ? req.body.maxprice : 9999,
    minprice: req.body.minprice ? req.body.minprice : 0,
    color: req.body.color ? req.body.color : /.*/,
    minram: req.body.minram ? req.body.minram - 1 : 0,
    maxram: req.body.maxram ? parseFloat(req.header.maxram) + 1 : 9999,
    minstorage: req.body.minstorage ? req.body.minstorage - 1 : 0,
    maxstorage: req.body.maxstorage ? parseFloat(req.body.maxstorage) + 1 : 9999
  }

  Product.find({
    price: { $lt: options.maxprice, $gt: options.minprice },
    color: options.color,
    ram: { $lt: options.maxram, $gt: options.minram },
    storage: { $lt: options.maxstorage, $gt: options.minstorage }
  },
    (err, allProducts) => {
      if (!err) {
        res.send(allProducts)
      }
      if (err) {
        console.log(err)
      }
    })
})

router.post('/', (req, res) => {
  try {
    const { make, model, price, color, image, storage, ram, amount } = req.body;
    const product = new Product({
      make,
      model,
      price,
      color,
      image,
      storage,
      ram,
      amount
    })
    product.save()
  } catch (err) {
    res.status(400)
    console.log(err)
  }
})

export default router;