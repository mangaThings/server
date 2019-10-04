const Router = require("express").Router()
const mangaController = require("../controllers/manga")
const {authentication} = require('../middlewares/auth')

Router.get("/", authentication, mangaController.getMangas)

module.exports = Router