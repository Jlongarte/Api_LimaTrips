const trips = require("./data");
const Trip = require("../models/trip.model");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://JLUser:cEcmN6wQkg1ihDb7@cluster0.7tbzash.mongodb.net/LimaTrips_Api?appName=Cluster0",
  )
  .then(async () => {
    // Buscamos todas las películas de nuestra colección
    const allTrips = await Trip.find();

    // Si existen películas previamente, dropearemos la colección
    if (allTrips.length) {
      await Trip.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    // Una vez vaciada la colección de las películas, usaremos el array movies de nuestra carpeta data
    // para llenar nuestra base de datos con todas las películas.
    await Trip.insertMany(trips);
    console.log("Viajes subidos");
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  // Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());
