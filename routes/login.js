const router = require("express").Router();

// Export User controller
const loginController = require("../controllers/loginController");

// endpoint User
router.get("/", loginController.viewLogin); // Untuk view
router.post("/", loginController.identifyUser); // Untuk view

// Lalu export routernya 
module.exports = router;