const AuthService = require('../services/AuthService')

class AuthController{
    async registration(req, res){
        try{
            const auth = await AuthService.registration(req.body)
            res.json(auth)
        }
        catch(e){
            res.status(401).json(e)
        }
    }

    async login(req, res){
        try{
            const auth = await AuthService.login(req.body)
            res.json(auth)
        }
        catch(e){
            res.status(401).json({
                message: e.message
            })
        }
    }

    async getUsers(_, res){
        const user = await AuthService.getUsers()
        res.json(user)
    }
}

module.exports = new AuthController()