const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const PORT=process.env.PORT || 4000;
const DB_URL=process.env.DB_URL;


const server=express();
//Con este comando ofrecemos la posibilidad de crear nuevos elementos en la db:
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(cors({
    origin: "*",
    credentials: true,
}));


server.listen(PORT, () =>{
    console.log(`bienvenido a la API de Hogwarts en http://localhost:${PORT}`)
});