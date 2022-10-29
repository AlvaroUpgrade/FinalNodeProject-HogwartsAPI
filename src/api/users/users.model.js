const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema=mongoose.Schema;

const userSchema= new Schema({
    username:{type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true},
    picture: {type: String, required: false},

},{timestamps: true});

userSchema.pre('save', function(next){
    this.password=bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model("users", userSchema);

module.exports= User;