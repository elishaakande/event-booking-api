const Event = require("../models/Event");
const Booking = require("../models/Booking");
const WaitingList = require("../models/WaitingList");

exports.initializeEvent = async (req, res) => {
  try {
    const { name, totalTickets } = req.body;
    const event = await Event.create({
      name,
      totalTickets,
      availableTickets: totalTickets,
      bookedTickets: [],
      waitingList: [],
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bookTicket = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.availableTickets > 0) {
      const booking = await Booking.create({ eventId, userId });
      event.bookedTickets.push(booking._id);
      event.availableTickets -= 1;
      await event.save();

      return res
        .status(200)
        .json({ success: true, message: "Ticket booked", booking });
    }

    // Add user to waiting list
    const waitingUser = await WaitingList.create({ eventId, userId });
    event.waitingList.push(waitingUser._id);
    await event.save();

    res.status(200).json({ success: true, message: "Added to waiting list" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const bookingIndex = event.bookedTickets.findIndex(
      (id) => id.toString() === userId
    );
    if (bookingIndex === -1)
      return res.status(400).json({ message: "No active booking found" });

    event.bookedTickets.splice(bookingIndex, 1);
    event.availableTickets += 1;

    await Booking.findByIdAndDelete(userId);

    if (event.waitingList.length > 0) {
      const nextUser = event.waitingList.shift();
      const newBooking = await Booking.create({
        eventId,
        userId: nextUser.userId,
      });

      event.bookedTickets.push(newBooking._id);
      event.availableTickets -= 1;
      await WaitingList.findByIdAndDelete(nextUser._id);
    }

    await event.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Booking canceled and next user assigned",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).populate(
      "waitingList bookedTickets"
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({
      success: true,
      availableTickets: event.availableTickets,
      waitingListCount: event.waitingList.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
