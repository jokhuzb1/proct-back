import express from 'express';
const router = express.Router();
import { Product } from '../models/product.js';

router.get('/', async (req, res) => {
  const options = {
    maxprice: req.query.maxprice ? req.query.maxprice : 9999,
    minprice: req.query.minprice ? req.query.minprice : 0,
    color: req.query.color ? req.query.color : /.*/,
    minram: req.query.minram ? parseFloat(req.query.minram) - 1 : 0,
    maxram: req.query.maxram ? parseFloat(req.query.maxram) + 1 : 9999,
    minstorage: req.query.minstorage ? req.query.minstorage - 1 : 0,
    maxstorage: req.query.maxstorage ? parseFloat(req.query.maxstorage) + 1 : 9999
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
        res.status(400).json("unexpected error occured")
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
    res.status(200).json("Successfully added")
  } catch (err) {
    res.status(400).json("Unable to add new document into the database")
    console.log(err)
  }
})

export default router;
