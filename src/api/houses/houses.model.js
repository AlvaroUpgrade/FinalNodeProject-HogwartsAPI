const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const housesSchema = new Schema(
  {
    name: { type: String, required: true },
    mascot: { type: String },
    founder: { type: String },
    leader: { type: String },
  },
  { timestamps: true }
);

const House = mongoose.model("houses", housesSchema);

module.exports = House;
