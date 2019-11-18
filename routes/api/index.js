const router = require("express").Router()
const ARoutes = require("./absoluteFit");

// routes
router.use("/absoluteFit", ARoutes);

module.exports = router;
