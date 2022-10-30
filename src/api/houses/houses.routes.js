const express = require("express");
const isAuth = require("../../middlewares/auth");
const House = require("./houses.model");
const router = express.Router();

router.get("/", async (req, res) => {
  //return res.status(200).json('Servidor ok, route index principal');
  try {
    const allHouses = await House.find();
    return res.status(200).json(allHouses);
  } catch (error) {
    return res.status(500).json("error: el servidor no ha podido cargar la petición");
  }
});

router.post("/create", [isAuth] , async (req, res) => {
  try {
    const postedHouse = req.body;
    const newHouse = new House(postedHouse);
    const created = await newHouse.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("error al completar los datos");
  }
});

router.put("/modify/:id", [isAuth] , async (req, res) => {
  try {
    const id = req.params.id;
    const house = req.body;
    const houseModifier = new House(house);
    houseModifier._id= id;
    const houseToModify = await House.findByIdAndUpdate(id, houseModifier);
    return res.status(200).json('objeto modificado con éxito');
  } catch (error) {
    return res.status(500).json('Este objeto no puede modificarse');
  }
});

router.delete("/delete/:id", [isAuth] , async (req, res) => {
  try {
    const id = req.params.id;
    const houseToDelete = await House.findByIdAndRemove(id);
    return res.status(200).json("La casa ha sido condenada al olvido");
  } catch (error) {
      return res.status(500).json("Esta casa es inamovible");
  }
});
module.exports = router;
