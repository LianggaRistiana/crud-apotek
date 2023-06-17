const Transaksi = require("../models/Transaksi");
const User = require("../models/User");
const Mitra = require("../models/Mitra");
const Obat = require("../models/Obat");

module.exports = {
  // read data transaksi
  viewTransaksi: async (req, res) => {
    req.session.loggedIn = true;
    try {
      var transaksi;
      if (req.query.tanggal != null) {
        transaksi = await Transaksi.find({ tanggal_transaksi: req.query.tanggal });
      } else if (req.query.tipe != null) {
        transaksi = await Transaksi.find({ jenis_transaksi: req.query.tipe });
      } else if (req.query.namabeli != null) {
        transaksi = await Transaksi.find({ nama_pembeli: req.query.namabeli });
      } else if (req.query.namajual != null) {
        transaksi = await Transaksi.find({ nama_penjual: req.query.namajual });
      }
      else {
        transaksi = await Transaksi.find();
      }
      //   message and status
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      customer = await User.find({userType:"customer"});
      var mitra = await Mitra.find();
      //   render componen
      res.render("transaksi_page", {
        transaksi,
        customer,
        mitra,
        alert,
        username: req.session.username,
        title: "transaksi Table"
      });
    } catch (error) {
      // back to user jika error
      res.redirect("/transaksi");
    }
  },
  viewProducts: async (req, res) => {
    req.session.loggedIn = true;
    console.log("================= viewProducts ===============");
    try {
      const transaksi = await Transaksi.findOne({ _id: req.params.id });
      const obat = await Obat.find();
      const products = transaksi.products;
      //   message and status
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      //   render componen
      res.render("list_products_page", {
        transaksi,
        products,
        obat,
        alert,
        username: req.session.username,
        title: "transaksi Table"
      });
    } catch (error) {
      // back to user jika error
      // erro message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi");
    }
  },

  // create data transaksi
  addTransaksi: async (req, res) => {
    try {
      req.session.loggedIn = true;
      await Transaksi.create(req.body);

      // success message
      req.flash("alertMessage", "Data transaksi berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect("/transaksi");

    } catch (error) {
      // erro message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi");
    }
  },
  // create data transaksi
  addProducts: async (req, res) => {
    req.session.loggedIn = true;
    try {
      const transaksi = await Transaksi.findOne({ _id: req.params.id });
      const obat = await Obat.findOne({ _id: req.body.obat});
      console.log("=============== ADD PRODUCT ===================");
      // console.log(req.body);

      const newProduct = {
        nama_obat: obat.namaObat,
        harga: obat.harga,
        kuantitas: req.body.kuantitas,
        total_harga: obat.harga * req.body.kuantitas
      };
      console.log(newProduct);
      transaksi.products.push(newProduct);
      transaksi.total_harga += (obat.harga* req.body.kuantitas);
      await transaksi.save();

      // success message
      req.flash("alertMessage", "Data Product berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect("/transaksi/products/" + req.params.id);

    } catch (error) {
      // erro message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi/products/" + req.params.id);
    }
  },
  // update data transaksi
  editTransaksi: async (req, res) => {
    req.session.loggedIn = true;
    try {
      console.log("================Edit transaksi=============");
      // cari data berdasarkan id dan update
      // await Transaksi.findByIdAndUpdate(req.params.id, req.body, {new:true});
      // succes message
      if (req.query.confirm != null) {
        await Transaksi.findByIdAndUpdate({_id:req.body.id},{
          $set: {
            isConfirm:true
          },
        });
        req.flash("alertMessage", "Berhasil menyimpan data transaksi");
        req.flash("alertStatus", "success");
        res.redirect("/transaksi");
      } else {


        const { id, nama_pembeli, nama_penjual, total_harga } = req.body;
        const transaksi = await Transaksi.findOne({ _id: id });

        // update dan simpan value baru
        console.log(transaksi);
        transaksi.nama_pembeli = nama_pembeli;
        transaksi.nama_penjual = nama_penjual;
        transaksi.total_harga = total_harga;

        await transaksi.save();

        req.flash("alertMessage", "Berhasil memperbarui data transaksi");
        req.flash("alertStatus", "success");
        res.redirect("/transaksi");
      }
    } catch (error) {
      // erro message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi");
    }
  },
  // update data product
  editProducts: async (req, res) => {
    req.session.loggedIn = true;
    try {
      console.log("================Edit products=============");

      const transaksi = await Transaksi.findOne({ _id: req.params.idTransaksi });
      console.log("harga normal :" + transaksi.total_harga);
      transaksi.total_harga -= req.body.harga * req.body.old_kuantitas;
      console.log("harga dikurangi :" + transaksi.total_harga);
      transaksi.total_harga += req.body.harga * req.body.new_kuantitas;
      console.log("harga baru" + transaksi.total_harga);

      await transaksi.save();

      // id di req body adalah id product
      await Transaksi.findOneAndUpdate(
        { _id: req.params.idTransaksi, 'products._id': req.body.id }, // Cari transaksi berdasarkan ObjectId dan produk dengan _id yang cocok
        {
          $set: {
            'products.$.nama_obat': req.body.nama_obat,
            'products.$.harga': req.body.harga,
            'products.$.kuantitas': req.body.new_kuantitas,
            'products.$.total_harga': req.body.harga * req.body.new_kuantitas,
          },
        },
        { new: true }
      );

      // update dan simpan value baru

      // succes message
      req.flash("alertMessage", "Berhasil memperbarui data transaksi");
      req.flash("alertStatus", "success");
      res.redirect("/transaksi/products/" + req.params.idTransaksi);
    } catch (error) {
      // erro message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi/products/" + req.params.idTransaksi);
    }
  },

  // Delete data transaksi
  deleteTransaksi: async (req, res) => {
    try {
      req.session.loggedIn = true;
      await Transaksi.findByIdAndDelete(req.params.id);

      // succes message
      req.flash("alertMessage", "Data transaksi berhasil dihapus");
      req.flash("alertStatus", "warning");
      res.redirect("/transaksi");
    } catch (error) {

      // error message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi");
    }
  },
  // Delete data produk
  deleteProducts: async (req, res) => {
    req.session.loggedIn = true;
    console.log(req.body.total_harga);
    try {

      const transaksi = await Transaksi.findOne({ _id: req.params.idTransaksi });
      // const product = await Transaksi.findOne({ 'products._id': req.params.idProduct })
      // .select('products.$')
      // .exec();
      console.log(transaksi);
      transaksi.total_harga -= parseInt(req.body.total_harga);
      await transaksi.save();

      await Transaksi.findOneAndUpdate(
        { _id: req.params.idTransaksi }, // Cari transaksi berdasarkan ObjectId
        { $pull: { products: { _id: req.params.idProduct } } },
        { new: true });

      // succes message
      req.flash("alertMessage", "Data Product berhasil dihapus");
      req.flash("alertStatus", "warning");
      res.redirect("/transaksi/products/" + req.params.idTransaksi);
    } catch (error) {

      // error message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi/products/" + req.params.idTransaksi);
    }
  },
};