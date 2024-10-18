const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/conn")

class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Pode usar UUIDV4 ou UUIDV1, conforme desejado
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adm: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User