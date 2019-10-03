const axios = require('axios')
const Comment = require('../models/comment')

class CommentController {
  static create(req, res){
    const user = '5d95cf50097e573460b64bdf'
    const mangaId = 4127
    const {comment} = req.body
    let sentiment
    axios({
      method : 'GET',
      url : 'https://api.aylien.com/api/v1/sentiment?text='+comment,
      headers : {
        "X-AYLIEN-TextAPI-Application-Key":"6ded5127bea965cb8caa97fb1c2f8627",
        "X-AYLIEN-TextAPI-Application-ID":"e6e63397"
      }
    })
    .then(result =>{
      console.log(result.data);
      sentiment = result.data.polarity
      Comment.create({
        user, comment, sentiment, mangaId
      })
      .then(data =>{
        console.log(data)
        res.status(201).json(data)
      })
      .catch(err =>{
        res.status(500).json({
          message : 'Error Internal Server'
        })
      })
    })
    .catch(err =>{
      res.status(500).json({
        message : "Internal Server Error"
      })
    })
  }

  static getCommentManga(req, res){
    Comment.find({mangaId : req.params.id})
    .then(data =>{
      console.log(data)
      res.status(200).json({
        comments : data
      })
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        message : 'Internal Server Error'
      })
    })
  }

}

module.exports = CommentController