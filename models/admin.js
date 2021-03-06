const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  admin_id: {
    type: String,
    required: true
  },
  admin_pwd: {
    type: String,
    required: true
  },
  major_name: {
    type: String,
  },
  type: Number
})

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
