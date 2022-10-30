const express = require("express");
const User = require("./users.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");
const isAuth = require("../../middlewares/auth");

router.get("/", [isAuth], async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json("error al acceder al archivo de usuarios");
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const userBody = req.body;
    const newUser = new User(userBody);
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json("error al crear usuario");
  }
});

router.post("/login", async (req, res) => {
  try {
    const userDb = await User.findOne({ email: req.body.email });
    if (!userDb) {
      return res
        .status(404)
        .json("el email introducido no coincide con ningún usuario");
    }
    if (bcrypt.compareSync(req.body.password, userDb.password)) {
      const token = generateSign(userDb._id, userDb.email);
      return res.status(200).json({token, userDb});
    }
    else{
        return res.status(404).json('la contraseña es incorrecta');
    }
    
  } catch (error) {
    return res.status(500).json('error al iniciar sesión');
  }
});

router.post('/logout', async(req, res) =>{
    try {
        const token = null;
        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json('Error al cerrar sesión');
    }
});

module.exports = router;
