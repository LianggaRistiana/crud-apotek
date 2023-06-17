const mongoose = require("mongoose");

const mitraScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  kontak: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  namaCP: {
    type: String,
    required: true
  },
  alamatCP: {
    type: String,
    required: true
  },
  kontakCP: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model("Mitra", mitraScheme);