const { UserRoutes } = require("./User")
const { EventRoutes } = require("./Event")

module.exports = (app) => {
    app.use("/user", UserRoutes)
    app.use("/event", EventRoutes)
}