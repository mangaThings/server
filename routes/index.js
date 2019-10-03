const router = require("express").Router();
const userRouter = require("./user");

router.get("/", (req, res) => {
  res.status(200).json("mangaThings!");
});

router.use("/users", userRouter);

module.exports = router;
