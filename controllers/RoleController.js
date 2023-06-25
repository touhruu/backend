const RoleService = require('../services/RoleService')

class RoleController{
    async roleAll(_, res){
        const role = await RoleService.roleAll()
        res.json(role)
    }

    async create(req, res){
        const role = await RoleService.create(req.body)
        res.json(role)
    }

    async roleOne(req, res){
        const {id} = req.params
        const role = await RoleService.roleOne(id)
        res.json(role)
    }

    async update(req, res){
        const {id} = req.params
        const role = await RoleService.update(id, req.body)
        res.json(role)
    }

    async delete(req, res){
        const {id} = req.params
        try{
            const role = await RoleService.delete(id)
            res.json(role)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = new RoleController()