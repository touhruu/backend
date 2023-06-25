const { Seria } = require("../models/Seria")
const { Video } = require("../models/Video")
const { Anime } = require("../models/Anime")

class SeriaService{
    async seriaAll(){
        const seria = await Seria.findAll({ include: [Video, Anime] })
        return seria
    }

    async create(seria, animeId, videoId){
        const anime = Anime.findByPk(animeId)
        const video = Video.findByPk(videoId)

        if(!anime) {
            throw new Error("Anime was not found");
        }

        if(!video) {
            throw new Error("Video was not found");
        }

        const seriaAdd = await Seria.create({ ...seria, AnimeId: animeId, VideoId: videoId})
        return seriaAdd
    }

    async seriaOne(seriaId){
        const seria = await Seria.findByPk(seriaId)
        return seria
    }

    async update(seriaId, seria){
        const seriaOne = await Seria.findByPk(seriaId)
        const seriaUpdate = await seriaOne.update(seria)
        return seriaUpdate
    }

    async delete(seriaId){
        const seria = await Video.findByPk(seriaId)
        
        if(seria){
            const seriaDelete = await Seria.destroy()
            return seriaDelete
        }
        else{
            throw new Error('seria was not found')
        }
    }
}

module.exports = new SeriaService()