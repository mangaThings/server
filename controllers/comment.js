const axios = require('axios')
const Comment = require('../models/comment')
const translate = require('@k3rn31p4nic/google-translate-api');

class CommentController {
  static create(req, res, next) {
    console.log(req.loggedUser)
    const user = req.loggedUser._id
    const { comment, mangaId } = req.body
    let sentiment
    translate(comment, { to: 'en' })
      .then(trans => {
        console.log(trans.text)
        axios({
          method: 'GET',
          url: 'https://api.aylien.com/api/v1/sentiment?text=' + trans.text,
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
      })
      .catch(next)
  }

  static getCommentManga(req, res, next) {
    Comment.find({ mangaId: req.params.id })
      .populate('user')
      .sort({
        createdAt: -1
      })
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