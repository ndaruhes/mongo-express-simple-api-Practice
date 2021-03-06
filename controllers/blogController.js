const { response } = require('express')
const Blog = require('../models/Blog')

module.exports = {
    index: async function(req, res){
        try{
            const blogs = await Blog.find()
            if(blogs.length > 0){
                res.json({
                    blogs: blogs,
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
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content
        })

        try{
            const newBlog = await blog.save()
            res.status(201).json({
                data: newBlog,
                message: 'Blog berhasil ditambah',
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
                data: updatedBlog,
                message: 'Blog berhasil diubah',
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
                data: res.blog,
                message: 'Blog berhasil dihapus',
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
    }
}