const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    'dest': 'uploads/'
});
const {
    asyncErrorHandler, isLoggedIn, isAuthor
} = require('../middleware');
const {
    postIndex,
    postNew,
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDelete
} = require('../controllers/posts');


/* GET posts index /posts */
router.get('/', asyncErrorHandler(postIndex));

/* GET posts new /posts/new */
router.get('/new', isLoggedIn, postNew);

/* POST posts create /posts */
router.post('/', isLoggedIn, upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit',isLoggedIn ,asyncErrorHandler(isAuthor), postEdit);

/* PUT posts update /posts/:id */
router.put('/:id', isLoggedIn ,upload.array('images', 4),asyncErrorHandler(isAuthor), asyncErrorHandler(postUpdate));


/* DELETE posts destroy /posts/:id */
router.delete('/:id',isLoggedIn ,asyncErrorHandler(isAuthor), asyncErrorHandler(postDelete));


module.exports = router;