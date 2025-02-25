const express = require("express");
const {
  initializeEvent,
  bookTicket,
  cancelBooking,
  getEventStatus,
} = require("../controllers/eventController");
const authenticate = require("../middlewares/auth");

const router = express.Router();

router.post("/initialize", authenticate, initializeEvent);
router.post("/book", bookTicket);
router.post("/cancel", authenticate, cancelBooking);
router.get("/status/:eventId", getEventStatus);

module.exports = router;
