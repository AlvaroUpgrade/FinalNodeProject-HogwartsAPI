const {mongoose} = require('mongoose');

const House = require('../../api/houses/houses.model');
const {DB_URL} = require('../database/db');

const houses = [
    {},
    {},
    {},
    { "name": "Slytherin",
    "mascot": "snake",
    "founder": "Salazar Slytherin",
    "leader": "Severus Snape"}
]