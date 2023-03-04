import { OrderModel } from "../models/order-model.js";

export async function addOrder(req, res) {
  try {
    const orderObject = new OrderModel(req.body);

    await orderObject.save();

    res.json('Заказ создан');
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Не удалось создать заказ',
    });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await OrderModel.find().populate('products.id');

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Не удалось получить заказы',
    });
  }
}
