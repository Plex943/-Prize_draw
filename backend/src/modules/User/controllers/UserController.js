const UserServices = require("../services/UserServices")

const userservices = new UserServices
module.exports = class UserController{
    static async register(req, res) {
        const {name, adm, email, password, confirmpassword} = req.body

        if (!name) {
            res.status(422).json({message: "o nome é obrigatorio"})
            return
        }

        if(adm === undefined) {
            res.status(422).json({message: "Você precisar ser lojista ou Administrador"})
            return
        }/////////// adicionar adm ao front

        if(!email) {
            res.status(422).json({message: "o email é obrigatorio"})
            return
        }

        if (!password) {
            res.status(422).json({message: "a senha é obrigatoria"})
            return
        }

        if (!confirmpassword) {
            res.status(422).json({message: "a confirmação da senha é obrigatoria!"})
            return
        }

        if (password !== confirmpassword) {
            res.status(422).json({message: "as senhas não conferem"})
            return
        }

        const user = await userservices.RegisterUser({name, adm, password, email}, req, res)
        if(!user) {
            res.status(422).json({message: "O usuario já existe!"})
            return
        }
    }

    static async login(req, res) {
        const {email, password} = req.body

        if (!email) {
            res.status(422).json({message: "O email é obrigatorio"})
            return
        }

        if (!password) {
            res.status(422).json({message: "A senha é obrigatoria"})
            return
        }

        const user = await userservices.LoginUser({email, password}, req, res)
        if (user === "notUser") {
            res.status(422).json({message: "O usuario não existe"})
            return
        }
        if (user === "notPassword") {
            res.status(422).json({message: "Senha incorreta"})
            return
        }

        res.status(200).json({message: "Login realizado com sucesso!"})
    }
}