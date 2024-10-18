const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = class Helpers {
    async createToken(user, req, res) {
        const token = await jwt.sign({
            name: user.name,
            id: user.id
        }, "secret")

        return res.status(201).json({message: "Usuario crido com sucesso", token, id: user.id, admin: user.adm})
    }

    async getUserToken(req) {
        const authToken = req.headers.authorization

        if (!authToken || !authToken.startsWith("Bearer ")) {
            throw new Error("token malformado ou não fornecido")
        }
        
        const token = authToken.split(" ")[1]
        return token
    }

    async getUserByToken(token, res) {
        if (!token) {
            res.status(401).json({message: "Token indefinido ou não fornecido!"})
            return
        }
        
        const decoded = jwt.verify(token, "secret")
        const userid = decoded.id
        const user = await User.findOne({where: {id: userid}})
        return user
    }

    verifyAdmToken = async (req, res, next) => {
        if(!req.headers.authorization) {
            res.status(401).json({message: "você não tem acesso à essa função!"})
            return
        }

        try {
            const token = await this.getUserToken(req)
            if (!token) {
                res.status(401).json({message: "token inexistente!"})
                return
            }

            const user = await this.getUserByToken(token, res)
            if (!user) {
                res.status(404).json({message: "Usuarios a inexistente!"})
                return
            }
            if (!user.adm) {
                res.status(401).json({message: "Você não tem acesso à essa função"})
                return
            }

            const verified = jwt.verify(token, "secret")
            req.user = verified
            next()
        } catch(err) {
            console.log(err)
        }
    }

    verifyToken = async (req, res, next) => {
        console.log("kdnkwedknededededede")
        if (!req.headers.authorization) {
            res.status(401).json({message: "Você não tem acesso à essa função!"})
            return
        }

        try {
            const token = await this.getUserToken(req)
            if (!token) {
                res.status(401).json({message: "token inexistente"})
                return
            }

            const verified = jwt.verify(token, "secret")
            req.user = verified
            next()
        } catch(err) {
            console.log(err)
        }
    }
}