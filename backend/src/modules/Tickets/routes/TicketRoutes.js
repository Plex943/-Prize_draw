const express = require("express")
const router = express.Router()
const TicketController = require("../controllers/TicketContoller")
const Helpers = require("../../../utils/helpers")

const helpers = new Helpers
router.get("/random/:eventId", helpers.verifyToken, TicketController.RandomTicket)
router.get("/clients", helpers.verifyToken, TicketController.AllClients)
router.get("/clients/:id", helpers.verifyToken, TicketController.GetClient)
router.post("/add/:eventId", helpers.verifyToken, TicketController.AddTicket)
router.patch("/edit/client", helpers.verifyToken, TicketController.UpdateClient)

module.exports = router