const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/ordersController");

router.post("/", orderController.createOrder); 
router.get("/", orderController.getOrders); 
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateOrderStatus);

module.exports = orderRouter;