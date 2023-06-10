const Transaksi = require("../models/Transaksi");

module.exports = {
  // read data transaksi
  viewTransaksi: async (req, res) => {
    req.session.loggedIn = true;
    try {
      const transaksi = await Transaksi.find();
    //   message and status
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
    //   render componen
      res.render("transaksi_page", {
        transaksi,
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
    console.log("masuk ke viewProducts");
    try {
      const transaksi = await Transaksi.findOne({_id:req.params.id});
      console.log(transaksi);
      const products = transaksi.products;
      console.log(products);
    //   message and status
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
    //   render componen
      res.render("list_products_page", {
        transaksi,
        products,
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
      const transaksi = await Transaksi.findOne({_id:req.params.id});
      console.log("=============== ADD PRODUCT ===================");
      // console.log(req.body);
      
      const newProduct = {
        nama_obat : req.body.nama_obat,
        harga : req.body.harga,
        kuantitas : req.body.kuantitas,
        total_harga : req.body.harga * req.body.kuantitas
      };
      console.log(newProduct);
      transaksi.products.push(newProduct);
      transaksi.total_harga += (req.body.harga * req.body.kuantitas);
      await transaksi.save();

      // success message
      req.flash("alertMessage", "Data Product berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect("/transaksi/products/"+req.params.id);

    } catch (error) {
      // erro message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi/products/"+req.params.id);
    }
  },
  // update data
  editTransaksi: async (req, res) => {
    req.session.loggedIn = true;
    try {
      console.log("================Edit transaksi=============");
      // cari data berdasarkan id dan update
      // await Transaksi.findByIdAndUpdate(req.params.id, req.body, {new:true});
      // succes message
      const {id,nama_pembeli,nama_penjual,tanggal_transaksi,jenis_transaksi,total_harga} = req.body;
      const transaksi = await Transaksi.findOne({_id:id});

      // update dan simpan value baru
      console.log(transaksi);
      transaksi.nama_pembeli = nama_pembeli;
      transaksi.nama_penjual = nama_penjual;
      transaksi.tanggal_transaksi = tanggal_transaksi;
      transaksi.jenis_transaksi = jenis_transaksi;
      transaksi.total_harga= total_harga;

      await transaksi.save();

      req.flash("alertMessage", "Berhasil memperbarui data transaksi");
      req.flash("alertStatus", "success");
      res.redirect("/transaksi");
    } catch (error) {
      // erro message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi");
    }
  },

  // Delete data
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
  // Delete data
  deleteProducts: async (req, res) => {
    req.session.loggedIn = true;
    console.log(req.body.total_harga);
    try {
      
      const transaksi = await Transaksi.findOne({_id : req.params.idTransaksi});
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
      res.redirect("/transaksi/products/"+ req.params.idTransaksi);
    } catch (error) {

      // error message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaksi/products/"+ req.params.idTransaksi);
    }
  },
};