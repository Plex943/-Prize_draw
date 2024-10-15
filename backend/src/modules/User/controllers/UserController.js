


module.exports = class UserController{
    static async register(req, res) {
        const {name, adm, email, password, confirmpassword} = req.body

        if (!name) {
            res.status(422).json({message: "o nome é obrigatorio"})
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

        


        res.status(200).json({message: "registro realizado com sucesso"})
        return
    }
}