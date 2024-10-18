const express = require("express")
const router = express.Router()
const EventController = require("../controllers/EventController")
const Helpers = require("../../../utils/helpers")

const helpers = new Helpers
router.get("/", EventController.getEndEvents)
router.get("/dashboard", helpers.verifyToken, EventController.Dashboard)
router.post("/add", helpers.verifyToken, EventController.AddEvent)
router.patch("/edit", helpers.verifyToken, EventController.EditEvent)
router.delete("/remove", helpers.verifyToken, EventController.DeleteEvent)

module.exports = router