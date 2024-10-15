const { UserRoutes } = require("./User")

module.exports = (app) => {
    app.use("/user", UserRoutes)
}