const router = require("express").Router();

// Export User controller
const loginController = require("../controllers/loginController");

// endpoint Login
router.get("/", loginController.viewLogin); // Untuk view
router.post("/", loginController.identifyUser); // Untuk Cek identify

// Lalu export routernya 
module.exports = router;