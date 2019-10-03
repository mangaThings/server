const axios = require("axios");
class mangaController {
  static getMangas(req, res, next) {
    axios({
      method: "get",
      url:
        "https://api.jikan.moe/v3/search/manga?limit=12&type=manga&order_by=score&sort=desc"
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch(next);
  }
}

module.exports = mangaController;
