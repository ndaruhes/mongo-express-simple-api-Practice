const express = require('express')
const router = express.Router()

// CALL CONTROLLERS
const blogController = require('../controllers/blogController')
const authController = require('../controllers/authController')

// CALL MODELS
const Blog = require('../models/Blog')

router.get('/', function(req, res){
    res.send('HALOOO GAIS ')
})

// AUTHENTICATION & REGISTER
router.post('/login', authController.login)
router.post('/register', authController.register)

// BLOG
router.route('/blogs')
    .get(blogController.index)
    .post(blogController.store)
router.route('/blogs/:id')
    .get(blogController.getBlog, blogController.show)
    .put(blogController.getBlog, blogController.update)
    .delete(blogController.getBlog, blogController.delete)


module.exports = router