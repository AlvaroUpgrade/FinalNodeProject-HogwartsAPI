const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');



const DB_URL=process.env.DB_URL;
const housesRoutes = require('./src/api/houses/houses.routes');

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
    console.log(`bienvenido a la API de Hogwarts en http://localhost:${PORT}`)
});