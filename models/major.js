const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MajorSchema = new Schema({
  major_name: {
    type: String,
  },
  major_dec: {
    type: String,
  }
},
  {
    timestamps: true,
  })

const Major = mongoose.model('major', MajorSchema);

module.exports = Major;
