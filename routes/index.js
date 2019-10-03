const router = require("express").Router();
const userRouter = require("./user");
const mangaRouter = require("./manga");
const comments = require('./comment')

router.get("/", (req, res) => {
  res.status(200).json("mangaThings!");
});

router.use('/comments', comments)
router.use("/users", userRouter);
router.use("/mangas", mangaRouter);

module.exports = router;
