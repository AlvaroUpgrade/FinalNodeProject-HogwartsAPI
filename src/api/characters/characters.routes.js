const express = require("express");
const Character = require("./characters.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allCharacters = await Character.find().populate("house");
    return res.status(200).json(allCharacters);
  } catch (error) {
    return next (error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const postedCharacters = req.body;
    const newCharacter = new Character(postedCharacters);
    const created = await newCharacter.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("error al completar los datos");
  }
});

router.put("/modify/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const  character = req.body;
    const characterModifier = new Character(character);
    characterModifier._id= id;
    const characterToModify = await Character.findByIdAndUpdate(id, characterModifier);
    return res.status(200).json('objeto modificado con éxito');
  } catch (error) {
    return res.status(500).json('Este objeto no puede modificarse');
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const characterToDelete = await Character.findByIdAndRemove(id);
    return res.status(200).json("¿Personaje? ¿Qué personaje?");
  } catch (error) {
      return res.status(500).json("Este personaje es inmortal");
  }
});
module.exports = router;
