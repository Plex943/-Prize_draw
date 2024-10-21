const { DataTypes } = require("sequelize")
const Sequelize = require("../config/conn")
const User = require("./User")
const Event = require("./Event")
const Client = require("./Client")

const sequelize = Sequelize.define("Tickets", {
    awarded: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    shopkeeperId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: "id"
        }
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: "id"
        }
    }
})

module.exports = sequelize