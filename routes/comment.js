const router = require('express').Router()
const CommentController =  require('../controllers/comment')

router.post('/', CommentController.create)
router.get('/:id', CommentController.getCommentManga)

module.exports = router