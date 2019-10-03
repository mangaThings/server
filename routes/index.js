const router = require('express').Router();
const comments = require('./comment')

router.get('/', (req, res)=>{
    res.status(200).json('mangaThings!')
})
router.use('/comments', comments)

module.exports = router