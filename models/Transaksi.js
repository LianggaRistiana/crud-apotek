const mongoose = require("mongoose");

const transaksiScheme = new mongoose.Schema({
    nama_pembeli: {
        type: String,
        require: true
    },
    nama_penjual: {
        type: String,
        require: true
    },
    tanggal_transaksi: {
        type: Date,
        require: true,
    },
    jenis_transaksi: {
        type: String,
        enum: ['pembelian', 'penjualan'],
        default: 'pembelian'
    },
    total_harga:{
        type:Number,
        require:true
    },
    products : [{
        nama_obat : {
            type:String,
            require:true
        },
        kuantitas:{
            type:Number,
            require:true
        },
        harga:{
            type:Number,
            require:true
        },
        total_harga:{
            type:Number,
            require:true
        }
    }]
})

module.exports = mongoose.model("Transaksi", transaksiScheme);