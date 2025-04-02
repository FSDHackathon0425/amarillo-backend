require("dotenv").config();

const getMenus = () => {
  return [
    { _id: "uygsadfhisgda", name: "Infantil", price: 15 },
    { _id: "asdhjkasd2312", name: "Paella", price: 25 },
    { _id: "9d8as7d8a7sd", name: "Burger", price: 25 },
    { _id: "9d8as7d8a7sd", name: "Vegetal", price: 65 }
  ];
};

const pedidos = [];

const postPedido = (userId, menuId) => {
  const menu = getMenus().find(menu => menu._id === menuId);
  if (menu) {
    const newPedido = { userId, menuId, name: menu.name, price: menu.price, estado: "en proceso" };
    pedidos.push(newPedido);
    console.log("Pedido realizado:", newPedido);
    return newPedido;
  }
  return null;
};

const getPedidos = (userId) => pedidos.filter(pedido => pedido.userId === userId).map(pedido => `🔹 ${pedido.name} - $${pedido.price} (${pedido.estado})`).join("\n") || "No tienes pedidos registrados.";

/***
 * BOT Commands
 ***/
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  console.log(msg);

  if (messageText === "/start") {
    bot.sendMessage(chatId, "Bienvenido a Duckburger");
    const inlineKeyboard = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Ver Menú", callback_data: "menu" }, { text: "Ver Pedido", callback_data: "orders" }]
        ],
      },
    };
    bot.sendMessage(chatId, "¿Qué desea hacer?", inlineKeyboard);
  }
});

// Handle callback queries
bot.on("callback_query", async (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;
  const chatId = message.chat.id;

  if (data === "menu") {
    const inlineKeyboard = {
      reply_markup: {
        inline_keyboard: getMenus().map(menu => [{
          text: `${menu.name} - $${menu.price}`,
          callback_data: menu._id
        }])
      }
    };
    bot.sendMessage(message.chat.id, "Aquí está nuestro menú:", inlineKeyboard);
  } else if (data === "orders") {
    bot.sendMessage(chatId, `Tus pedidos:\n${getPedidos(chatId)}`);
  } else {
    const selectedMenu = getMenus().find(menu => menu._id === data);
    if (selectedMenu) {
      const pedido = postPedido(chatId, selectedMenu._id);
      if (pedido) {
        bot.sendMessage(chatId, `Pedido realizado: ${pedido.name} - $${pedido.price}\nEstado: ${pedido.estado}`);
      } else {
        bot.sendMessage(chatId, "Error al procesar el pedido.");
      }
    } else {
      bot.sendMessage(chatId, "Selección no válida.");
    }
  }
});

/***
 * END BOT Commands
 ***/

/***
 * HTTP Express Backend Commands
 ***/
const express = require("express");
const port = 3333;
const app = express();
app.use(express.json());
app.listen(port, () => {
  console.log("El servidor está escuchando en el puerto " + port);
});
