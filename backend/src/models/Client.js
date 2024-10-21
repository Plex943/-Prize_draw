const { DataTypes } = require("sequelize")
const Sequelize = require("../config/conn")

const sequelize = Sequelize.define("Client", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = sequelize