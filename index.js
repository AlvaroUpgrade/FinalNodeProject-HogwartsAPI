const express = require('express');
const housesRoutes = require('./src/api/houses/houses.routes');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/utils/database/db');

db.connectDb();
const DB_URL=process.env.DB_URL;


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


server.listen(PORT, () =>{
    console.log(`Bienvenido a la API de Hogwarts en http://localhost:${PORT}`)
});