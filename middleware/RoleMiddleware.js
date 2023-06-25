const jwt = require('jsonwebtoken')
const { secretKey } = require('../key')

module.exports = function(roles){
    return function (req, res, next){
        if(req.method === 'OPTIONS'){
            next()
        }
    
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(403).json({
                    message: 'Пользователь не авторизирован'
                })
            }
    
            const userRole = jwt.verify(token, secretKey)
            let hasRole = false

            if(userRole.roles === roles){
                hasRole = true
            }

            if(!hasRole){
                return res.status(403).json({
                    message: 'У вас нет доступа'
                })
            }
            next()
        }
        catch(e){
            console.log(e)
            return res.status(403).json({
                message: 'Пользователь не авторизирован'
            })
        }
    }
}