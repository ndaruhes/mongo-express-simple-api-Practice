const { response } = require('express')
const Blog = require('../models/Blog')
const auth = require('../middleware/checkAuth')

module.exports = {
    index: async function(req, res){
        try{
            const blogs = await Blog.find()
            if(blogs.length > 0){
                res.json({
                    blogs: blogs.map(blog => {
                        return {
                            id: blog._id,
                            title: blog.title,
                            content: blog.content,
                            cover: blog.cover,
                            slug: blog.slug
                        }
                    }),
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + '/blogs'
                    },
                    status: true
                })
            }else{
                res.json({
                    message: 'Blog kosong',
                    status: true
                })
            }
        }catch(err){
            res.statu(500).json({
                error: err.message,
                status: false
            })
        }
    },
    show: function(req, res){
        res.send(res.blog)
    },
    store: async function(req, res){
        // res.send(auth.decoded)
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            cover: req.file.filename,
            slug: createSlug(req.body.title),
            // userId: '6043b143519a331ea8153804'
        })

        try{
            const newBlog = await blog.save()
            res.status(201).json({
                data: {
                    id: newBlog._id,
                    title: newBlog.title,
                    slug: newBlog.slug,
					// userId: '6043b143519a331ea8153804'
                },
                message: 'Blog berhasil ditambah',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + '/blogs'
                },
                status: true
            })
        }catch(err){
            res.status(400).json({
                error: err.message,
                message: 'Blog gagal ditambah',
                status: false
            })
        }
    },
    update: async function(req, res){
        res.blog.title = req.body.title
        res.blog.content = req.body.content

        try{
            const updatedBlog = await res.blog.save()
            res.json({
                data: {
                    id: updatedBlog._id,
                    title: updatedBlog.title
                },
                message: 'Blog berhasil diubah',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + '/blogs/' + res.blog.id
                },
                status: true

            })
        }catch(err){
            res.status(400).json({
                error: err.message,
                message: 'Blog gagal diubah',
                status: false
            })
        }
    },
    delete: async function(req, res){
        try{
            await res.blog.remove()
            res.json({
                data: {
                    id: res.blog._id,
                    title: res.blog.title
                },
                message: 'Blog berhasil dihapus',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + '/blogs/' + res.blog.id
                },
                status: true,
            })
        }catch(err){
            res.status(500).json({
                error: err.message,
                message: 'Blog gagal dihapus',
                status: false
            })
        }
    },
    getBlog: async function(req, res, next){
        let blog
        try{
            blog = await Blog.findById(req.params.id)
            if(blog == null){
                return res.status(404).json({message: 'Cannot find blog'})
            }
        }catch(err){
            return res.status(500).json({
                error: err.message,
                message: 'gk tau',
                status: false
            })
        }
    
        res.blog = blog
        next()
    },
}

function createSlug (string){
    const dateFormat = new Date().getTime()
    return string
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "")+'-'+dateFormat
}