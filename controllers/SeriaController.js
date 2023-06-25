const SeriaService = require('../services/SeriaService')


class SeriaController{
    async seriaAll(_, res){
        const seria = await SeriaService.seriaAll()
        res.json(seria)
    }

    async create(req, res){
        const { addSeria, animeId, videoId } = req.body
        const seria = await SeriaService.create(addSeria, animeId, videoId)
        res.json(seria)
    }

    async seriaOne(req, res){
        const {id} = req.params
        const seria = await SeriaService.seriaOne(id)
        res.json(seria)
    }

    async update(req, res){
        const {id} = req.params
        const seria = await SeriaService.update(id, req.body)
        res.json(seria)
    }

    async delete(req, res){
        const {id} = req.params
        try{
            const seria = await SeriaService.delete(id)
            res.json(seria)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = new SeriaController()