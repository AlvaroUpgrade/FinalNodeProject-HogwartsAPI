const express = require('express');
const housesRoutes = require('./src/api/houses/houses.routes');
const charactersRoutes = require ('./src/api/characters/characters.routes');
const userRoutes = require ('./src/api/users/users.routes');
const cloudinary = require ('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();
const db = require('./src/utils/database/db');

db.connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret : process.env.API_SECRET

});

const server=express();
const PORT=process.env.PORT || 4000;

server.use(cors({
    origin: "*",
    credentials: true,
}));
//Con este comando ofrecemos la posibilidad de crear nuevos elementos en la db:
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/houses', housesRoutes);
server.use('/characters', charactersRoutes);
server.use('/users', userRoutes);

server.use((error,req,res,next) => {
    console.log("error next", error.message);
    return res.status(418).json(error.message)
});

server.listen(PORT, () =>{
    console.log(`Bienvenido a la API de Hogwarts en http://localhost:${PORT}`)
});