import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';

// @desc Create new order
// @route POST api/orders
// @access Private
const addOrderItems = asyncHandler( async(req, res) => {
   const { 
    orderItems,
    shippingAddress,
    paymentMethod
   } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items');
    }else{
         // get the ordered items from our database
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) },
        });

        // map over the order items and use the price from our items from database
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemFromDB) => itemFromDB._id.toString() === itemFromClient._id);

            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            };
        });

        // calculate prices
        const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc get logged in users orders
// @route GET api/orders/myorders
// @access Private
const getMyOrders = asyncHandler( async(req, res) => {
    const orders = await Order.find({ user: req.user._id});

    res.status(200).json(orders);
});

// @desc get order by Ids
// @route GET api/orders/:id
// @access Private
const getOrderById = asyncHandler( async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order){
        res.status(200).json(order)
    }else{
        res.status(404)
        throw new Error('Order not found');
    }

});

// @desc update Order to Pay
// @route GET api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler( async(req, res) => {
    res.send('get order by id to paid')
});

// @desc update to delivered
// @route GET api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler( async(req, res) => {
    res.send('get order by id to delivered')
});

// @desc get all orders
// @route GET api/orders/:id/deliver
// @access Private/Admin
const getOrders = asyncHandler( async(req, res) => {
    res.send('get all orders')
});


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}