const express = require("express");
const upload = require("../middlewares/file");
const {
  getTrips,
  getTripsByCategory,
  createTrip,
  updateTrip,
  deleteTrip,
  searchTripsByTitle,
} = require("../controllers/trips.controllers");

const router = express.Router();

router.get("/", getTrips);
router.get("/search", searchTripsByTitle);
router.get("/category/:category", getTripsByCategory);

router.post("/", upload.single("image"), createTrip);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

module.exports = router;
