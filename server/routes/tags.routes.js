const express = require('express');
const { authentication } = require('../utils/jwt');
const { getAllTags, createTags, getAllTagsPosition, getTagsForPosition,
    getTagsByUserPosition
 } = require('../controllers/tags.controllers');

const router = express.Router();

router.use(authentication);

router.get('/getAll',getAllTags)
router.post('/createTags',createTags)
router.get('/getAllTagsPosition',getAllTagsPosition)
router.get('/getTagsPosition',getTagsForPosition)

router.get('/getTagsByUserPosition',getTagsByUserPosition)

module.exports = router;