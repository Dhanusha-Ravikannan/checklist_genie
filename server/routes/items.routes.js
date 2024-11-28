const express = require('express');
const { authentication } = require('../utils/jwt');

const { getAllItems, createItems,
    getItemsByTemplate, getChecklistItemsForToday, saveOrUpdateChecklistResponse
 } = require('../controllers/items.controllers');
const router = express.Router();

router.use(authentication);

router.get('/getItems',getAllItems);
router.post('/createItems',createItems);

router.get('/getItemsByTemplate/:tag_id',getItemsByTemplate);
router.post('/saveOrUpdateChecklistResponse',saveOrUpdateChecklistResponse);
router.get('/getChecklistItemsForToday',getChecklistItemsForToday);

module.exports = router;