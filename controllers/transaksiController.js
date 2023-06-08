const Transaksi = require("../models/Transaksi");

const logoutUser = (req, res) => {
  req.session.loggedIn = false; // Menghapus status login pengguna
  req.session.username = null; 
  res.redirect("/");
};

module.exports = {
  // read data transaksi
  viewUser: async (req, res) => {
    try {
      req.session.loggedIn = true;
      const transaksi = await Transaksi.find();

    //   message and status
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

    //   render componen
    
      res.render("user_page", {
        transaksi,
        alert,
        username: req.session.username,
        title: "transaksi Table"
      });
    } catch (error) {
      // back to user jika error
      res.redirect("/user");
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

  // update data
  editUser: async (req, res) => {
    try {
      req.session.loggedIn = true;
      
      // cari data berdasarkan id dan update
      await Transaksi.findByIdAndUpdate(req.params.id, req.body, {new:true});
      
      // succes message
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
  deleteUser: async (req, res) => {
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
  logoutUser
};