const express = require("express");
const User = require("./users.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");
const isAuth = require("../../middlewares/auth");
const upload = require("../../middlewares/file");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res
      .status(500)
      .json("error al acceder al archivo de usuarios", error);
  }
});

router.post("/sign-up", upload.single("picture"), async (req, res) => {
  try {
    const userBody = req.body;
    if (req.file) {
      userBody.picture = req.file.path;
    } else {
      userBody.picture = req.body.picture;
    }
    const newUser = new User(userBody);
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json("Error al crear usuario");
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
      return res.status(200).json({ token, userDb });
    } else {
      return res.status(404).json("la contraseña es incorrecta");
    }
  } catch (error) {
    return res.status(500).json("error al iniciar sesión", error);
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json("Error al cerrar sesión", error);
  }
});

router.put("/edit-profile/:id", [isAuth], upload.single("picture"), async (req, res) => {
    try {
      const id = req.params.id;
      const user = req.body;
      const userModifier = new User(user);
      userModifier._id = id;
      const userToModify = await User.findByIdAndUpdate(id, userModifier);
      return res.status(200).json("Usuario modificado con éxito");
    } catch (error) {
      return res
        .status(500)
        .json("Error al actualizar las credenciales", error);
    }
  }
);

router.delete("/delete-user/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    const userToDelete = await User.findByIdAndRemove(id);
    return res.status(200).json("Has borrado tu cuenta");
  } catch (error) {
    return res.status(500).json("Error al eliminar usuario");
  }
});

module.exports = router;
