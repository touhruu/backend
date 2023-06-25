const RoomService = require('../services/RoomService')

class RoomController{
    async getAll(req, res){
        const rooms = await RoomService.getAll()

        return res.json(rooms)
    }

    async create(req, res){
        const { addRoom, AnimeId } = req.body
        const newRoom = await RoomService.create(addRoom, AnimeId, req.user.id)

        return res.json(newRoom)
    }

    async addUserInRoom(req, res){
        const { roomId, url } = req.body
        const addUser = await RoomService.addUserInRoom(roomId, req.user.id, url)

        return res.json(addUser)
    }

    async getByIdRoom(req, res){
        const { url } = req.params
        const room = await RoomService.getByIdRoom(url)

        return res.json(room)
    }
}

module.exports = new RoomController()