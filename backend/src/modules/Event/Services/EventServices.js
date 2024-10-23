const Event = require("../../../models/Event")
const Helpers = require("../../../utils/helpers")
const EventUser = require("../../../models/EventUsers")

const helpers = new Helpers
module.exports = class EventServices {
    async getEndEvents(req, res) {
        const events = await Event.findAll({where: {state: false}})
        if (events[0] === undefined) {
            return undefined
        } else {
            return events
        }
    }
    
    async AddEvent(req, res) {
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token, res)

        const {name, start, end, state} = req.body
        await Event.create({name, start, end, state, adminId: user.id})
        return
    }

    async EditEvent(req, res) {
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token, res)
        
        const {key, name, start, end, state} = req.body
        const event = await Event.findOne({where: {key: key, adminId: user.id}})
        if ( !event ) {
            return false
        }

        const NewEvent = await event.update({name, start, end, state})
        return NewEvent
    }

    async GetAllEvents(req, res) {
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token, res)

        const events = await Event.findAll({where: {adminId: user.id}})
        if (events[0] === undefined) {
            return false
        }
        return events
    }

    async DeleteEvent(req, res) {
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token, res)

        const {key} = req.body
        if (!key) {
            return false
        }

        const event = await Event.findOne({where: {key:key, adminId: user.id}})
        if (!event) {
            return false
        }

        if (event) {
            await Event.destroy({where: {key: key, adminId: user.id}})
            return true
        }
    }

    async GetEvent(req) {
        const id = req.params.id
        if (!id) {
            return false
        }
        const event = await Event.findOne({where: {id: id}})

        if (!event) {
            return false
        }

        return event
    }

    async JoinEvent(req, res) {
        const {key} = req.body
        if (!key) {
            return undefined
        }
        const event = await Event.findOne({where: {key: key}})

        if (!event) {
            return undefined
        }
        if (!event.state) {
            return "EventFinish"
        }
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token, res)

        const joinEvent = await EventUser.create({UserId: user.id, EventId: event.id})
        if (joinEvent) {
            return event
        } else {
            return false
        }
    }

    async PartcipateEvents(req, res) {
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token, res)
        
        const participate = await EventUser.findAll({where: {UserId: user.id}})
        if (participate[0] === undefined) {
            return undefined
        }

        const events = await Promise.all(participate.map(async (event) => {
            const a = await Event.findOne({where: {id: event.EventId}, raw: true})
            return a
        }))

        return events
    }

    async ExitEvent(req, res) {
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token, res)
        const id = req.params.id

        const exit = await EventUser.destroy({where: {UserId: user.id, EventId: id}})
        console.log(exit)
        
        return true
    }

    async HandleEventState(req, res) {
        const eventId = req.params.eventId
        const event = await Event.findOne({where: {id: eventId}})
        if (!eventId || !event) {
            return "notEvent"
        }
        if (event.state === true) {
            await event.update({state: false})
            return "toFalse"
        }
        if (event.state === false) {
            await event.update({state: true})
            return "toTrue"
        }
    }
}