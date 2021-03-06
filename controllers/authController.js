require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    login: async function(req, res){
        User.findOne({email: req.body.email}, async(err, user) => {
            if(err) res.status(500).json({error: err.message, message: 'Ups terjadi kesalahan', status: false})
            if(!user) res.status(404).json({email: req.body.email, message: 'User tidak terdaftar', status: false})
            if(!user.checkPassword(req.body.password)) res.json({message: 'Kombinasi email dan password gk sesuai', status: false})

            const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
                expiresIn: '1h'
            })

            res.json({
                message: 'Berhasil Login',
                status: true,
                token: token
            })
        })
    },
    register: async function(req, res){
        await User.findOne({email: req.body.email}, async (err, user) => {
            if(err) res.status(500).json({error: err.message, message: 'Ups terjadi kesalahan', status: false})
            if(user){
                res.json({email: req.body.email, message: 'Alamat email sudah digunakan', status: false})
            }else{
                try{
                    const newUser = await new User()
                    newUser.name = req.body.name,
                    newUser.email = req.body.email,
                    newUser.password = newUser.hashPassword(req.body.password)
                    newUser.save()

                    res.status(201).json({
                        data: newUser,
                        message: 'Berhasil Register',
                        status: true
                    })
                }catch(err){
                    res.status(400).json({
                        error: err.message,
                        message: 'Gagal Register',
                        status: false
                    })
                }
            }
        })
    },
}