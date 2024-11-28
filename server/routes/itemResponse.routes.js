const express = require('express');
const {  getItemResponses, updateItemResponse } = require('../controllers/itemResponse.controllers');
const router = express.Router();



router.get('/getResponse',getItemResponses );
router.post('/createResponse',updateItemResponse );

module.exports = router;