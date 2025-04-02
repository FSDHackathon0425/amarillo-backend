const express = require("express");
const menuRouter = express.Router();

const menuController = require('../controllers/menuController');

router.get("/" , menuController.getMenus);

module.exports = menuRouter