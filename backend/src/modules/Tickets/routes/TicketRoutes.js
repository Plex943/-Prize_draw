const express = require("express")
const router = express.Router()
const TicketController = require("../controllers/TicketContoller")
const Helpers = require("../../../utils/helpers")

const helpers = new Helpers
router.get("/random/:eventId", helpers.verifyToken, TicketController.RandomTicket)
router.get("/clients", helpers.verifyToken, TicketController.AllClients)
router.patch("/edit/client", helpers.verifyToken, TicketController.UpdateClient)
router.post("/add/:eventId", helpers.verifyToken, TicketController.AddTicket)

module.exports = router