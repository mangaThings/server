const router = require('express').Router()
const CommentController =  require('../controllers/comment')
const {authentication} = require('../middlewares/auth')

router.use(authentication)
router.post('/', CommentController.create)
router.get('/:id', CommentController.getCommentManga)

module.exports = router