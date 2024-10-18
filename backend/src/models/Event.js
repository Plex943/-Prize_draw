const crypto = require("crypto")
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/conn")

class Event extends Model {}
Event.init({
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => generateUniqueKey()
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end: {
        type: DataTypes.DATE,
        allowNull: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    adminId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Event"
})

function generateUniqueKey() {
    return crypto.randomBytes(8).toString("hex")
}

module.exports = Event