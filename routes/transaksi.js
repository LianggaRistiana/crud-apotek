const router = require("express").Router();

// Export User controller
const loginController = require("../controllers/loginController");
const transaksiController = require("../controllers/transaksiController");

// endpoint User
router.get("/", transaksiController.viewTransaksi); // Untuk view
router.get("/products/:id", transaksiController.viewProducts); // Untuk view
router.get("/logout", loginController.logoutUser); // Untuk view
router.post("/", transaksiController.addTransaksi); // Untuk add transaksi
router.post("/:id", transaksiController.addProducts); // Untuk add product suatu 
router.put("/", transaksiController.editTransaksi); // untuk edit transaksi
router.put("/:idTransaksi", transaksiController.editProducts); // untuk edit product
router.delete("/:id", transaksiController.deleteTransaksi); // Untuk delete
router.delete("/:idTransaksi/:idProduct", transaksiController.deleteProducts); // Untuk delete product

// Lalu export routernya 
module.exports = router;