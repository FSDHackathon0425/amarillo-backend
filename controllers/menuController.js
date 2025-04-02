const Menu = require('../models/Menu';)

const menuController = {
    getMenus: async (req , res) => {
        try {
            const menus = await Menu.find();
            res.json(menus);
        } catch (error) {
            res.status(500).json({message: "Error al obtener los datos del menú"})
        }
    }
}

module.exports = menuController