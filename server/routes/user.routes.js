const express = require("express");
const { getAllUsers, createUsers } = require("../controllers/user.controllers");
const router = express.Router();

router.get("/getall", getAllUsers);
router.post("/create", createUsers);

module.exports = router;
