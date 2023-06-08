const router = require("express").Router();

// if (isAdmin === true) {
    

// Export User controller
const userController = require("../controllers/userController");

// endpoint User
router.get("/", userController.viewUser); // Untuk view
router.get("/nama/:nama", userController.viewUserByName); // Untuk view
router.get("/umur/:umur", userController.viewUserByUmur); // Untuk view
router.get("/alamat/:alamat", userController.viewUserByAlamat); // Untuk view
router.get("/telp/:telp", userController.viewUserByTelp); // Untuk view
router.get("/email/:email", userController.viewUserByEmail); // Untuk view
router.get("/tipe/:tipe", userController.viewUserByTipe); // Untuk view
router.get("/logout", userController.logoutUser); // Untuk view
router.post("/", userController.addUser); // Untuk add
router.put("/", userController.editUser); // Untuk edit
router.delete("/:id", userController.deleteUser); // Untuk delete
// router.get("*",userController.viewUser);
// Lalu export routernya 
module.exports = router;

// }else{
    
// }