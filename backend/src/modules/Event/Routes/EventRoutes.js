const express = require("express")
const router = express.Router()
const EventController = require("../controllers/EventController")
const Helpers = require("../../../utils/helpers")

const helpers = new Helpers

// lojista
router.get("/all", helpers.verifyToken, EventController.ParticipateEvents)
router.post("/join", helpers.verifyToken, EventController.JoinEvent)
router.delete("/exit/:id", helpers.verifyToken, EventController.ExitEvent)

// adm 
router.get("/", EventController.getEndEvents)
router.get("/dashboard", helpers.verifyAdmToken, EventController.Dashboard)
router.get("/:id", helpers.verifyAdmToken, EventController.GetEvent)
router.post("/add", helpers.verifyAdmToken, EventController.AddEvent)
router.patch("/edit", helpers.verifyAdmToken, EventController.EditEvent)
router.patch("/end/:eventId", helpers.verifyAdmToken,  EventController.HandleEventState)
router.delete("/remove", helpers.verifyAdmToken, EventController.DeleteEvent)

module.exports = router