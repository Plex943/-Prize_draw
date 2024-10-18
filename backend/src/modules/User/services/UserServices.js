const User = require("../../../models/User")
const Helpers = require("../../../utils/helpers")
const bcrypt = require("bcryptjs")

const helper = new Helpers
module.exports = class UserServices {
    async RegisterUser(data, req, res) {
        const {name, adm, email, password} = data
        const userAlreadyExists = await User.findOne({where: {email: email}})

        if (userAlreadyExists) {
            return false
        }

        if (!userAlreadyExists) {
            const hashedPassword = bcrypt.hashSync(password, 6)
            const user = await User.create({name, adm, email, password: hashedPassword})
            const token = await helper.createToken({id: user.id, name, adm, email, password}, req, res)
            return user
        }
    }

    async LoginUser(user, req, res) {
        const userAlreadyExists = await User.findOne({where: {email: user.email}})
        if (!userAlreadyExists) {
            return "notUser"
        }

        if (!bcrypt.compareSync(user.password, userAlreadyExists.password)) {
            return "notPassword"
        }

        await helper.createToken(userAlreadyExists, req, res)
    }
}