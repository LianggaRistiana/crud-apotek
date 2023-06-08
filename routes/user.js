const router = require("express").Router();

// if (isAdmin === true) {
    

// Export User controller
const userController = require("../controllers/userController");

// endpoint User
router.get("/", userController.viewUser); // Untuk view
router.get("/logout", userController.logoutUser); // Untuk view
router.post("/", userController.addUser); // Untuk add
router.put("/", userController.editUser); // Untuk edit
router.delete("/:id", userController.deleteUser); // Untuk delete

// Lalu export routernya 
module.exports = router;

// }else{
    
// }