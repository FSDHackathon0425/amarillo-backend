const Order = require('../models/Orders');

const orderController = {
    createOrder: async (req , res) => {
        try {
            const {user , order} = req.body;
            const newOrder = new Order({user , order});
            await newOrder.save();

            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({message: "Error al crear el pedido"});
        }
    },

    getOrders: async (req , res) => {
        try {
            const orders = await Order.find().populate("order.menuID");
            res.json(orders);
        } catch (error) {
            res.status(500).json({message: "Error al obtener los pedidos"})
        }
    },

    getOrderById: async (req, res) => {
        try {
          const order = await Order.findById(req.params.id).populate("order.menuID");
          if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
          res.json(order);
        } catch (error) {
          res.status(500).json({ message: "Error al obtener el pedido" });
        }
      },

    updateOrderStatus: async (req , res) => {
        try {
            const {state} = req.body;
            const order = await Order.findByIdAndUpdate(req.params.id , {state} , {new: true});

            if (!order) return res.status(404).json({message: "Pedido no encontrado"});
            res.json(order);
        } catch (error) {
            res.status(500).json({message: "Error al actualizar el estado del pedido"})
        }
    },
};

module.exports = orderController;