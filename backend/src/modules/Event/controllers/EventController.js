const EventServices = require("../Services/EventServices")

const eventservices = new EventServices
module.exports = class EventController {
    static async getEndEvents(req, res) {
        const events = await eventservices.getEndEvents(req, res)
        if(!events) {
            res.status(404).json({message: "nenhum evento foi terminado ainda!"})
            return
        }

        res.status(200).json({message: "Todos o eventos terminados!", events})
    }

    static async AddEvent(req, res) {
        const {name, start, end, state} = req.body

        if (!name) {
            res.status(422).json({message: "o nome é obgigatorio!"})
            return
        }
        if (!start) {
            res.status(422).json({message: "A data de inicio é obrigatoria!"})
            return
        }
        if (!end) {
            res.status(422).json({message: "A data do fim é obrigatoria"})
            return
        }
        if (!state) {
            res.status(422).json({message: "O estado inicial é obrigatorio!"})
            return
        }
        await eventservices.AddEvent(req, res)
        res.status(201).json({message: "Evento Criado com sucesso!"})
    }

    static async EditEvent(req, res) {
        const {name, start, end, state} =  req.body

        try {
            if(!name) {
                res.status(422).json({message: "O nome é obrigatorio!"})
                return
            }

            if (!start) {
                res.status(422).json({message: "A data de inicio é obrigatoria!"})
                return
            }

            if (!end) {
                res.status(422).json({message: "A data do fim é obrigatoria!"})
                return
            }

            if (state === undefined || state === "") {
                res.status(422).json({message: "O estado do sorteio é obrigatorio!"})
                return
            }

            const event = await eventservices.EditEvent(req, res)
            if (!event) {
                res.status(404).json({message: "O Sorteio não existe ou não pertence à você!"})
                return
            }

            res.status(200).json({message: "Sorteio editado com sucesso!", event})
        } catch(err) {
            console.log(err)
        }
    }

    static async Dashboard(req, res) {
        const events = await eventservices.GetAllEvents(req, res)
        if (!events) {
            res.status(404).json({message: "Eventos não encontrados!"})
            return
        }
        res.status(200).json({message: "Todos os Eventos", events})
    }

    static async DeleteEvent(req, res) {
        const eventDeleted = await eventservices.DeleteEvent(req, res)
        if(!eventDeleted) {
            res.status(422).json({message: "O Sorteio não existe ou não lhe pertence!"})
            return
        } else {
            res.status(200).json({message: "Sorteio removido com sucesso!"})
            return
        }
    }
}