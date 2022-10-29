const mongoose = require("mongoose");
//ruta de la db
const DB_URL = process.env.DB_URL;
console.log(DB_URL);
if (!DB_URL) throw new Error("No se encuentra la URL de la database");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    const { name, host } = db.connection;
    console.log(`Conectado con éxito a ${name} en el servidor ${host}`);
  } catch (error) {
    console.log("Error para encontrar la database", error);
  }
};

module.exports = {
  connectDb,
  DB_URL,
};
