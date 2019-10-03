const axios = require('axios')
const Comment = require('../models/comment')

class CommentController {
  static create(req, res) {
    const user = '5d95cf50097e573460b64bdf'
    const mangaId = 4127
    const { comment } = req.body
    let sentiment
    axios({
      method: 'GET',
      url: 'https://api.aylien.com/api/v1/sentiment?text=' + comment,
      headers: {
        "X-AYLIEN-TextAPI-Application-Key": process.env.API_SENTIMENT,
        "X-AYLIEN-TextAPI-Application-ID": process.env.SENTIMENT_ID
      }
    })
      .then(result => {
        console.log(result.data);
        sentiment = result.data.polarity
        return Comment.create({
          user, comment, sentiment, mangaId
        })
      })
      .then(data => {
        console.log(data)
        res.status(201).json(data)
      })
      .catch(next)
  }

  static getCommentManga(req, res) {
    Comment.find({ mangaId: req.params.id })
      .then(data => {
        console.log(data)
        res.status(200).json({
          comments: data
        })
      })
      .catch(next)
  }

}

module.exports = CommentController