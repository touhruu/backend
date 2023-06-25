const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('sequelize')
const { Room } = require('../models/Room')
const { Anime } = require('../models/Anime')
const { User } = require('../models/User');
const { Seria } = require('../models/Seria');
const { Video } = require('../models/Video');
const { UsersInTheRoom } = require('../models/UsersInTheRoom');


class RoomService{
    async getAll(){
        const rooms = await Room.findAll({
            include: [Anime, User]
        })
        return rooms
    }

    async create(addRoom, animeId, userId){
        const anime = await Anime.findByPk(animeId)
        if(!anime) {
            throw new Error("Anime was not found");
        }

        if(!userId) {
            throw new Error("User was not found");
        }

        const roomCreate = await Room.create({ ...addRoom, AnimeId: animeId })
        await roomCreate.addUser(userId, { through: { admin: true } })
        const updateRoom = await roomCreate.update({url: `${roomCreate.id}-${uuidv4()}`})

        return updateRoom
    }

    async addUserInRoom(idRoom, userId, url){
        const room = await Room.findByPk(idRoom)
        if(UsersInTheRoom.admin === true){
            throw new Error("Ohh")
        } 

        if(room.url !== url){
            throw new Error("Room was not found")
        }
        
        const addUser = await room.addUser(userId, { through: { admin: false } })

        return addUser
    }

    async getByIdRoom(url){
        const room = await Room.findOne({
            include: { all: true, nested: true },
            where: { url }
        })

        const seria = await Seria.findAll({
            where: {AnimeId: room.Anime.id},
            include: [Video],
            order: [
                ['position', 'DESC']
            ]
        })

        return { ...room.toJSON(), Anime: { ...room.Anime.toJSON(), seria: seria } }
    }
}

module.exports = new RoomService