// require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try{
        // const token = req.headers.authorization.split(" ")[1]
        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        
        if(decoded.exp <= Date.now()/1000){
            return res.status(401).json({
                date: Date.now()/1000,
                exp: decoded.exp,
                message: 'Token was expired',
                status: false
            })
        }

        req.userData = decoded
        next()
    }catch(err){
        return res.status(401).json({
            error: err.message,
            message: 'Problem with token', 
            status: false
        })
    }
    // const token = req.headers['authorization']
    // if(token){
    //     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    //         if(err) res.status(401).json({message: 'Problem with token', status: false})

    //         req.decoded = decoded
    //         next()

    //         if(decoded.exp <= Date.now()/1000){
    //             return res.status(401).json({
    //                 date: Date.now()/100,
    //                 exp: decoded.exp,
    //                 message: 'Token was expired',
    //                 status: false
    //             })
    //         }
    //     })
    // }else{
    //     res.status(403).json({
    //         message: 'Token Not Available',
    //         status: false
    //     })
    // }
}