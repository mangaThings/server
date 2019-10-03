const Router = require("express").Router()
const mangaController = require("../controllers/manga")

Router.get("/", mangaController.getMangas)

module.exports = Router