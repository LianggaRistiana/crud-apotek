const User = require("../models/User");

module.exports = {
  // read data user
  viewUser: async (req, res) => {
    try {
      const user = await User.find();

    //   message and status
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

    //   render componen
      res.render("user_page", {
        user,
        alert,
        title: "User Table",
        heading: "Tabel User"
      });
    } catch (error) {
      // back to user jika error
      res.redirect("/user");
    }
  },

  // create data user
  addUser: async (req, res) => {
    try {
      const { nama, password, umur, email, no_telp, alamat, userType } = req.body;

      await User.create({ nama, password, umur, email, no_telp, alamat, userType });

      // success message
      req.flash("alertMessage", "Data user berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect("/user");

    } catch (error) {
      // erro message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },

  // update data
  editUser: async (req, res) => {
    try {
      const { id, nama, password, umur, email, no_telp, alamat, userType } = req.body;
      
      // cari data berdasarkan id
      const user = await User.findOne({ _id: id });
      
      // update data dari request body
      user.nama = nama;
      user.password = password;
      user.umur = umur;
      user.email = email;
      user.no_telp = no_telp;
      user.alamat = alamat;
      user.userType = userType;

      // simpan data ke database
      await user.save();

      // succes message
      req.flash("alertMessage", "Berhasil memperbarui data user");
      req.flash("alertStatus", "success");
      res.redirect("/user");
    } catch (error) {
      // erro message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },

  // Delete data
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      // cari data berdasarkan id
      const user = await User.findOne({ _id: id });

      // delete data
      await user.deleteOne();

      // succes message
      req.flash("alertMessage", "Data user berhasil dihapus");
      req.flash("alertStatus", "warning");
      res.redirect("/user");
    } catch (error) {

      // error message
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/user");
    }
  },
};