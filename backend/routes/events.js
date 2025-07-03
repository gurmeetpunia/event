const express = require("express");
const { requireAuth, requireOrganizer } = require("../middleware/auth");
const eventsController = require("../controllers/eventsController");

const router = express.Router();

// Get all events
router.get("/", eventsController.getAllEvents);

// Create event (organizer only)
router.post("/", requireAuth, requireOrganizer, eventsController.createEvent);

// Register for event
router.post("/:id/register", requireAuth, eventsController.registerForEvent);

// Unregister from event
router.post("/:id/unregister", requireAuth, eventsController.unregisterFromEvent);

module.exports = router;
