const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { Video } = require("../models/Video")

class VideoService{
    async videoAll(){
        const video = await Video.findAll()
        return video
    }

    async create(video){
        const fileExtention = path.extname(video.name);
        const fileName = uuidv4() + fileExtention;
        const uploadPath = path.resolve(__dirname, '..', 'videos', fileName);
        video.mv(uploadPath, (err) => {
            if(err) throw new Error('file error');
        })
        const videoAdd = await Video.create({videoFile: fileName})
        return videoAdd
    }

    async videoOne(videoId){
        const video = await Video.findByPk(videoId)
        return video
    }

    async update(videoId, video){
        const videoOne = await Video.findByPk(videoId)
        const videoUpdate = await videoOne.update(video)
        return videoUpdate
    }

    async delete(videoId){
        const video = await Video.findByPk(videoId)
        
        if(video){
            const videoDelete = await Video.destroy()
            return videoDelete
        }
        else{
            throw new Error('video was not found')
        }
    }
}

module.exports = new VideoService()