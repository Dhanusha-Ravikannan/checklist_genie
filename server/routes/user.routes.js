const express = require("express");
const { getAllUsers, createUsers, getUsersbyID } = require("../controllers/user.controllers");
const router = express.Router();

router.get("/getall", getAllUsers);
router.post("/create", createUsers);
router.get('/user/:id',getUsersbyID)

module.exports = router;
