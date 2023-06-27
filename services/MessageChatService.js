const { MessageChat } = require('../models/MessageChat')
const { Anime } = require('../models/Anime')
const { User } = require('../models/User')
const { Room } = require('../models/Room')

class MessageChatService{
    async getAll(url){
        const room = await Room.findOne({
            where: {
                url: url
            }
        })
        const messages = await MessageChat.findAll({
            where: {
                RoomId: room.id
            },
            include: [User]
        })
        return messages
    }

    async create(message, roomId, userId){
        const room = await Room.findByPk(roomId)
        if(!room) {
            console.log(room)
            throw new Error("Room was not found");
        }

        if(!userId) {
            throw new Error("User was not found");
        }

        const addMessage = await MessageChat.create({ message: message, RoomId: roomId, UserId: userId })

        return addMessage
    }
}

module.exports = new MessageChatService