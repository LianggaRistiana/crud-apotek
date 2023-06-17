const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  tanggal_lahir: {
    type: Date,
    required: true,
  },
  no_telp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userType:{
    type: String,
    enum : ['customer','admin'],
    default : 'customer'
  },
});
module.exports = mongoose.model("User", userScheme);