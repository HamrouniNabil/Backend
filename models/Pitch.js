const mongoose = require('mongoose');
const { isEmail } = require('validator');

const pitchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adresse: { type: String, required: true },
  phone1: { type: String, required: true, maxlength: 8 },
  phone2: { type: String, maxlength: 8 },
  email: { type: String, required: true, validate: isEmail },
  capacite: { type: Number, required: true },
  prix: { type: String, required: true },
  image: { type: String },
});

module.exports.Pitch = mongoose.model('pitch', pitchSchema);
