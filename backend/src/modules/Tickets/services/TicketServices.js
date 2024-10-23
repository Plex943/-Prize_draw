const Helpers = require("../../../utils/helpers")
const Client = require("../../../models/Client")
const Tickets = require("../../../models/Tickets")
const Event = require("../../../models/Event")
const User = require("../../../models/User")

const helpers = new Helpers
module.exports = class TicketServices {
    async AddTicket(req, res) {
        const eventId = req.params.eventId
        const token = await helpers.getUserToken(req)
        const user = await helpers.getUserByToken(token , res)
        
        const {name, telephone} = req.body
        const eventAlreadyExists = await Event.findOne({where: {id: eventId}})
        if (!eventId || !eventAlreadyExists || eventAlreadyExists.state === false) {
            return "notEventId"
        }

        let client = await Client.findOne({where: {telephone: telephone}})
        if(!client){
            client = await Client.create({name, telephone})
        }

        const ticket = await Tickets.create({awarded: false, shopkeeperId: user.id, eventId: eventId, clientId: client.id})
        return ticket
    }

    async RandomTicket(req) {
        const eventId = req.params.eventId
        const event = await Event.findOne({where: {id: eventId}})
        
        if(!eventId || !event || !event.state) {
            return "notEvent"
        }
        
        const tickets = await Tickets.findAll({where: {eventId: eventId}})
        for (let ticket of tickets) {
            if (ticket.awarded) {
                await event.update({state: false})
                return "notEvent"
            }
        }

        if (tickets.length === 0) {
            return "noTickets"
        }
        const randomIndex = Math.floor(Math.random() * tickets.length)
        const randomTicket = tickets[randomIndex]
        await randomTicket.update({awarded: true})
        await event.update({state: false})

        const winner = await Client.findOne({where: {id: randomTicket.clientId}})   
        const shopkeeper = await User.findOne({where: {id: randomTicket.shopkeeperId}})
        const eventWinner = await Event.findOne({where: {id: randomTicket.eventId}})
        return {winner, shopkeeper, event: eventWinner, ticketsQTY: tickets.length}
    }

    async UpdateClient(req, res) {
        const {name, telephone, newTelephone} = req.body
        const client = await Client.findOne({where: {telephone: telephone}})
        if (!client) {
            return "noClient"
        }
        await client.update({name, telephone: newTelephone})
    }

    async AllClients(req, res) {
        const clients = await Client.findAll()
        if (clients.length === 0) {
            return "noTickets"
        }
        return clients
    }

    async GetClient(req, res) {
        const id = req.params.id
        const client = await Client.findOne({where: {id:id}})
        if (!client) {
            return "noclient"
        }

        return client
    }
}