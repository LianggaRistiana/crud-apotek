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
      
      const user = await User.find();

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
  // read user by name
  viewUserByName: async (req, res) => {
    req.session.loggedIn = true;
    try {      
      
      // console.log(req.body);
      const user = await User.find({nama:req.params.nama});
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
      });
    } catch (error) {
      // back to user jika error
      res.redirect("/user");
    }
  },
  // read user by umur
  viewUserByUmur: async (req, res) => {
    req.session.loggedIn = true;
    try {
      const user = await User.find({umur:req.params.umur});
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
  // read user by tipe
  viewUserByTelp: async (req, res) => {
    req.session.loggedIn = true;
    try {
      const user = await User.find({no_telp:req.params.telp});
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
  // read user by alamat
  viewUserByAlamat: async (req, res) => {
    req.session.loggedIn = true;
    try {
      const user = await User.find({alamat:req.params.alamat});
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
  // read user by email
  viewUserByEmail: async (req, res) => {
    req.session.loggedIn = true;
    try {
      const user = await User.find({email:req.params.email});
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
  // read user by tipe
  viewUserByTipe: async (req, res) => {
    req.session.loggedIn = true;
    try {
      const user = await User.find({userType:req.params.tipe});
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
      
      const { nama, password, umur, email, no_telp, alamat, userType } = req.body;
      console.log(req.body);
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