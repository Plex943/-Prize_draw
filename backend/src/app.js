const express = require("express")
const cors = require("cors")
const app = express()
const iniModules = require("./modules")
const db = require("./config/conn")

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

iniModules(app)

module.exports = app