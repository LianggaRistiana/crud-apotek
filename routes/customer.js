// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const customerController = require("../controllers/customerController");

// endpoint mahasiswa
router.get("/", customerController.viewCustomer); // Untuk view
router.post("/", customerController.addCustomer); // Untuk add
router.put("/", customerController.editCustomer); // Untuk edit
router.delete("/:id", customerController.deleteCustomer); // Untuk delete

// Lalu export routernya 
module.exports = router;