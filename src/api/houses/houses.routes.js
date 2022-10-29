const express = require("express");
const House = require("./houses.model");
const router = express.Router();

router.get("/houses", async (req, res) => {
  //return res.status(200).json('Servidor ok, route index principal');
  try {
    const allHouses = await House.find();
    return res.status(200).json(allHouses);
  } catch (error) {
    return res
      .status(500)
      .json("error: el servidor no ha podido cargar la petición");
  }
});

router.post("/create", async (req, res) => {
  try {
    const postedHouse = req.body;
    const newHouse = new House(postedHouse);
    const created = await newHouse.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("error al completar los datos");
  }
});

module.exports = router;
