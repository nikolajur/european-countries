const { Router } = require("express");

const { vsechnyStatyNazev, vybranyStatNazev } = require("../controllers/statyCtrl");

const router = Router();

// GET /staty
router.get("/", vsechnyStatyNazev);

// GET /staty/:id
router.get("/:id", vybranyStatNazev);

module.exports = router;
