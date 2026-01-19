const express = require("express");
const { generateToken, getTokenByMRID, getTokensByDate } = require("../controller/tokenController");
const router = express.Router();

router.post('/token', generateToken);
router.get('/token/:mrid', getTokenByMRID);
router.get('/token-summary', getTokensByDate);

module.exports = router;