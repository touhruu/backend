const UserService = require('../services/UserService')

class UserController{
    async userAll(_, res){
        const user = await UserService.userAll()
        res.json(user)
    }

    async userOne(req, res){
        const {id} = req.params
        const user = await UserService.userOne(id)
        res.json(user)
    }

    async update(req, res){
        const user = await UserService.update(req.user.id, req.body)
        res.json(user)
    }

    async delete(req, res){
        const {id} = req.params
        try{
            const user = await UserService.delete(id)
            res.json(user)
        }
        catch(e){
            res.user(404).json({
                message: e.message
            })
        }
    }

    async whoAmI(req, res){
        try{
            const user = await UserService.userOne(req.user.id)
            res.json(user) 
        }
        catch(e){
            console.log(e)
            res.status(401).json({
                message: 'вы какашка'
            })
        }
        
    }

    async addAvatar(req, res){
        const avatar = await UserService.addAvatar(req.files.file, req.user.id)
        res.json(avatar)
    }

    async addBackgraund(req, res){
        const backgraund = await UserService.addBackgraund(req.files.file, req.user.id)
        res.json(backgraund)
    }

    async updateUserMail(req, res){
        try{
            const user = await UserService.updateUserMail(req.body, req.user.id)
            res.json(user)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }

    async updateUserPass(req, res){
        try{
            const user = await UserService.updateUserPass(req.body, req.user.id)
            res.json(user)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = new UserController()