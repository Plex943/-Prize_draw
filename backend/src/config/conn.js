const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("prizedraw", "root", "1234567890", {
    host: "localhost",
    dialect: "mysql"
})
sequelize.authenticate()
console.log("Conectou ao banco")

module.exports = sequelize