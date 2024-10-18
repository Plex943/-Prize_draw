const Event = require("../../../models/Event")
const Helpers = require("../../../utils/helpers")

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
        console.log(user)

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
        const event = await Event.findOne({where: {key:key, adminId: user.id}})
        if (!event) {
            return false
        }

        if (event) {
            await Event.destroy({where: {key: key, adminId: user.id}})
            return true
        }
    }
}