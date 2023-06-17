const User = require("../models/User");

const logoutUser = (req, res) => {
  req.session.loggedIn = false; // Menghapus status login pengguna
  req.session.username = null; 
  res.redirect("/");
};

module.exports = {
  // read data user
  viewUser: async (req, res) => {
    req.session.loggedIn = true;
    try {
      var user;
      if (req.query.tipe != null) {
        user = await User.find({userType:req.query.tipe});
      } else if (req.query.nama != null){
        user = await User.find({nama:req.query.nama});
      } else if (req.query.umur != null){
        user = await User.find({umur:req.query.umur});
      } else if (req.query.alamat != null){
        user = await User.find({alamat:req.query.alamat});
      } else if (req.query.telp != null){
        user =  await User.find({no_telp:req.query.telp});
      } else if (req.query.email != null){
        user = await User.find({email:req.query.email});
      } else {
        user = await User.find();
      }

    //   message and status
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

    //   render componen
      res.render("user_page", {
        user,
        alert,
        username: req.session.username,
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
    req.session.loggedIn = true;
    try {
      
      const { nama, password, tanggal_lahir, email, no_telp, alamat, userType } = req.body;
      console.log(req.body);
      await User.create({ nama, password, tanggal_lahir, email, no_telp, alamat, userType });
      
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
    req.session.loggedIn = true;
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
    req.session.loggedIn = true;
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
  logoutUser
};