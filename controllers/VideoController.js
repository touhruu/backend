const VideoService = require('../services/VideoService')


class VideoController{
    async videoAll(_, res){
        const video = await VideoService.videoAll()
        res.json(video)
    }

    async getLastVideo(_, res){
        const video = await VideoService.getLastVideo()
        res.json(video)
    }

    async create(req, res){
        const video = await VideoService.create(req.files.file)
        res.json(video)
    }

    async videoOne(req, res){
        const {id} = req.params
        const video = await VideoService.videoOne(id)
        res.json(video)
    }

    async update(req, res){
        const {id} = req.params
        const video = await VideoService.update(id, req.body)
        res.json(video)
    }

    async delete(req, res){
        const {id} = req.params
        try{
            const video = await VideoService.delete(id)
            res.json(video)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = new VideoController()