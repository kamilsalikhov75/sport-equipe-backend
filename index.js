import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import {
  addProduct,
  getProduct,
  getProducts,
} from './controllers/product-controller.js';
import { addOrder, getOrders } from './controllers/order-controller.js';

const port = process.env.PORT || 3001;

const dbUrl = process.env.DB_URI;
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('database work');
  })
  .catch((error) => console.log('database error', error));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'images');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/images', express.static('images'));

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server work');
});

app.post('/images', upload.single('image'), (req, res) => {
  res.json({
    url: `/images/${req.file.originalname}`,
  });
});

app.post('/products', addProduct);
app.get('/products', getProducts);
app.get('/products/:id', getProduct);

app.post('/orders', addOrder);
app.get('/orders', getOrders);
