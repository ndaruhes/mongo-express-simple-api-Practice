const express = require('express')
const router = express.Router()
// const upload = require('../middleware/fileUpload')

// CALL CONTROLLERS
const blogController = require('../controllers/blogController')
const authController = require('../controllers/authController')

// CALL MIDDLEWARE
const checkAuth = require('../middleware/checkAuth')
const fileUpload = require('../middleware/fileUpload')

router.get('/', function(req, res){
    res.send('HALOOO GAIS ')
})

// AUTHENTICATION & REGISTER
router.post('/login', authController.login)
router.post('/register', authController.register)

// BLOG
router.route('/blogs')
    .get(blogController.index)
    .post(checkAuth, fileUpload.single('cover'), blogController.store)
router.route('/blogs/:id')
    .get(blogController.getBlog, blogController.show)
    .put(checkAuth, blogController.getBlog, blogController.update)
    .delete(checkAuth, blogController.getBlog, blogController.delete)


module.exports = router