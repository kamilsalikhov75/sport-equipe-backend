import { ProductModel } from '../models/product-model.js';

export async function addProduct(req, res) {
  try {
    const productDoc = new ProductModel({
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      price: req.body.price,
    });

    await productDoc.save();
    res.status(200).send('Товар создан');
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось создать товар');
  }
}

export async function getProducts(req, res) {
  try {
    const products = await ProductModel.find();
    console.log(products);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось получить товары');
  }
}

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).send('Не удалось получить товар');
  }
};
