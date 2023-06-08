const User = require("../models/User");


module.exports = {
    // read data user
    viewLogin: async (req, res) => {
        try {
          const user = await User.find();
            
          const { nama, password, umur, email, no_telp, alamat, userType } = req.body;
        //   message and status
          const alertMessage = req.flash("alertMessage");
          const alertStatus = req.flash("alertStatus");
          const alert = { message: alertMessage, status: alertStatus };
    
        //   render componen
          res.render("login", {
            alert,
            title: "Login",
          });
        } catch (error) {
          // back to user jika error
          res.redirect("/");
        }
      },

      identifyUser: async (req, res) => {
        try {
          const { username, password } = req.body;
          
          // cari data berdasarkan id
          const user = await User.findOne({ nama: username });
          
          // update data dari request body
          if (user.nama === username && user.password === password && user.userType === "admin") {
            req.session.loggedIn = true;
            req.session.username = user.nama;
            res.redirect("/user");
           
          }else{
            // gagal message
          req.flash("alertMessage", "Login gagal");
          req.flash("alertStatus", "danger");
          res.redirect("/");
          }
        } catch (error) {
          // erro message
          req.flash("alertMessage", "Username tidak ada");
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      },
}