const StatusService = require('../services/StatusService')

class StatusController{
    async statusAll(_, res){
        const status = await StatusService.statusAll()
        res.json(status)
    }

    async create(req, res){
        const status = await StatusService.create(req.body)
        res.json(status)
    }

    async statusOne(req, res){
        const {id} = req.params
        const status = await StatusService.statusOne(id)
        res.json(status)
    }

    async update(req, res){
        const {id} = req.params
        const status = await StatusService.update(id, req.body)
        res.json(status)
    }

    async delete(req, res){
        const {id} = req.params
        try{
            const status = await StatusService.delete(id)
            res.json(status)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = new StatusController()