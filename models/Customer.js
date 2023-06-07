const mongoose = require("mongoose");

// Membuat variabel baru dengan nama mahasiswaScheme
const customerScheme = new mongoose.Schema({
  nama: {
    // Membuat type dari field nama yang berada di tabel mahasiswa bersifat string
    type: String,
    // maksud dari required adalah ketika data disimpan kedalam database, data tidak boleh kosong
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  umur: {
    // Membuat type dari field nama yang berada di tabel mahasiswa bersifat number
    type: Number,
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
});

// lalu mengekspor model dari mahasiswa, tujuan mengekspor ini supaya model dari mahasiswa ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("Customer", customerScheme);