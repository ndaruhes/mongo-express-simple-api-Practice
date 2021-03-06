const express = require('express')
const router = express.Router()

// CALL CONTROLLERS
const blogController = require('../controllers/blogController')
const authController = require('../controllers/authController')

// CALL MIDDLEWARE
const checkAuth = require('../middleware/checkAuth')

router.get('/', function(req, res){
    res.send('HALOOO GAIS ')
})

// AUTHENTICATION & REGISTER
router.post('/login', authController.login)
router.post('/register', authController.register)

// BLOG
router.route('/blogs')
    .get(blogController.index)
    .post(checkAuth, blogController.store)
router.route('/blogs/:id')
    .get(blogController.getBlog, blogController.show)
    .put(checkAuth, blogController.getBlog, blogController.update)
    .delete(checkAuth, blogController.getBlog, blogController.delete)


module.exports = router