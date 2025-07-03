const Event = require("../models/Event");

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create event (organizer only)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = new Event({
      title,
      description,
      date,
      organizer: req.user._id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register for event
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (!event.registrations.includes(req.user._id)) {
      event.registrations.push(req.user._id);
      await event.save();
      // Emit real-time update
      const io = req.app.get("io");
      io.to(event._id.toString()).emit("registrationUpdate", {
        eventId: event._id,
        registrations: event.registrations.length,
      });
    }
    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Unregister from event
exports.unregisterFromEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.registrations = event.registrations.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );
    await event.save();
    // Emit real-time update
    const io = req.app.get("io");
    io.to(event._id.toString()).emit("registrationUpdate", {
      eventId: event._id,
      registrations: event.registrations.length,
    });
    res.json({ message: "Unregistered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
