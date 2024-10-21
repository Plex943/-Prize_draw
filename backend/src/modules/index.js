const { UserRoutes } = require("./User")
const { TicketRoutes } = require("./Tickets")
const { EventRoutes } = require("./Event")

module.exports = (app) => {
    app.use("/user", UserRoutes)
    app.use("/tickets", TicketRoutes)
    app.use("/event", EventRoutes)
}