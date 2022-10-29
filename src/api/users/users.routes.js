const express = require('express');
const User = require('./users.model');
const router = express.Router();
const bcrypt = require('bcrypt');
const {generateSign} = require('../../utils/jwt/jwt');

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.send(200).json(allUsers);
    } catch (error) {
        return res.send(500).json('error al acceder al archivo de usuarios');
    }
});

module.exports = router;