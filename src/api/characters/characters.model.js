const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const charactersSchema = new Schema({
    name: {type: String, required: true},
    house: {type: mongoose.Schema.Types.ObjectId, ref: "houses" },
    wand: {type: String},
    status: {type: String, enum: ['student', 'mage', 'dark mage', 'muggle', 'other'], default: 'student'}
}, 
{timestamps: true});


const Character = mongoose.model('character', charactersSchema );

module.exports = Character;