const User = require('../models/User')

module.exports = {
    login: function(req, res){
        res.json('POST LOGIN')
    },
    register: function(req, res){

        User.findOne({email: req.body.email}, function(err, user){
            if(err) res.json(err)
            if(user){
                res.json({message: 'alamat email sudah digunakan', email: req.body.email})
            }else{
                const newUser = new User()
                newUser.name = req.body.name,
                newUser.email = req.body.email,
                newUser.password = User.hashPassword(req.body.password)

                newUser.save(function(err){
                    if(err) res.send(err)
                    
                    res.json({
                        status: true,
                        message: 'User berhasil dibuat',
                        data: req.body
                    })
                })
            }
        })
    },
}