const Trip = require("../models/trip.model");

// Obtener todos los viajes
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los viajes" });
  }
};

// Obtener viajes por categoría
const getTripsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const tripsByCategory = await Trip.find({ category });

    if (!tripsByCategory || tripsByCategory.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron viajes para esta categoría" });
    }

    res.status(200).json(tripsByCategory);
  } catch (error) {
    res.status(400).json({ error: "Error en la búsqueda por categoría" });
  }
};

// Buscar viajes por título
const searchTripsByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: "Debes indicar ?title=" });
    }

    const trips = await Trip.find({ title: new RegExp(title, "i") });

    if (trips.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron viajes con ese título" });
    }

    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({
      error: "Error al buscar viaje",
      detalles: err.message,
    });
  }
};

// Crear un viaje
const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({
      error: "Error al crear el viaje",
      detalles: err.message,
    });
  }
};

// Actualizar un viaje
const updateTrip = async (req, res) => {
  try {
    const updated = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({
      error: "Error al actualizar el viaje",
      detalles: err.message,
    });
  }
};

// Eliminar un viaje
const deleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }
    res.status(200).json({ mensaje: "Viaje eliminado correctamente" });
  } catch (err) {
    res.status(400).json({
      error: "Error al eliminar el viaje",
      detalles: err.message,
    });
  }
};

module.exports = {
  getTrips,
  getTripsByCategory,
  createTrip,
  updateTrip,
  deleteTrip,
  searchTripsByTitle,
};
