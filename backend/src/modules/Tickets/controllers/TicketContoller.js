const TicketServices = require("../services/TicketServices")

const ticketservices = new TicketServices
module.exports = class TicketController {
    static async AddTicket(req, res) {
        const {name, telephone} = req.body

        if (!name) {
            res.status(422).json({message: "O nome é obrigatorio!"})
            return
        }

        if (!telephone) {
            res.status(422).json({message: "O telefone é obrigatorio!"})
            return
        }
        const ticket = await ticketservices.AddTicket(req, res)
        if (ticket === "notEventId") {
            res.status(422).json({message: "O Sorteio não existe ou está inativo!"})
            return
        }

        res.status(200).json({message: "Bilhete adicionado com sucesso!"})
    }

    static async RandomTicket(req, res) {
        const winnerInfo = await ticketservices.RandomTicket(req)
        if (winnerInfo === "notEvent") {
            res.status(422).json({message: "O Sorteio não existe ou já foi encerrado!"})
            return
        }

        if (winnerInfo === "noTickets") {
            res.status(422).json({message: "O respectivo Sorteio não tem bilhetes cadastrados!"})
            return
        }
        
        res.status(200).json({
            message: "Informações do Vencedor: ", 
            winner: winnerInfo.winner,
            shopkeeper: winnerInfo.shopkeeper,
            event: winnerInfo.event
        })
    }
    
    static async UpdateClient(req, res) {
        const {name, telephone} = req.body
        
        if (!name) {
            res.status(422).json({message: "O nome é Obriagatorio!"})
            return
        }

        if (!telephone) {
            res.status(422).json({message: "O telefone é obrigatorio!"})
            return
        }
        const client = await ticketservices.UpdateClient(req, res)

        if (client === "noClient") {
            res.status(422).json({message: "O cliente solicitado não existe!"})
            return
        }

        res.status(200).json({message: "Cliente Atualizado com sucesso!"})
    }

    static async AllClients(req, res) {
        const clients = await ticketservices.AllClients(req, res)
        if (clients === "noTickets") {
            res.status(404).json({message: "Nenhum Bilhete encontrado!"})
            return
        }
        res.status(200).json({message: "Todos os Clientes: ", clients})
    }
}