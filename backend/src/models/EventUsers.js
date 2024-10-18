const { DataTypes } = require("sequelize")
const Sequelize = require("../config/conn")
const User = require("./User")
const Event = require("./Event")

const sequelize = Sequelize.define("EventUsers", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    EventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: "id"
        }
    }
})

module.exports = sequelize