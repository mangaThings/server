const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    mangaId: {
        type: Number
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
    },
    sentiment: {
        type: String,
    },
    language: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment