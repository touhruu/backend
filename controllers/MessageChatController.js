const MessageChatService = require('../services/MessageChatService')

class MessageChatController{
    async getAll(req, res){
        const {id} = req.params
        const messages = await MessageChatService.getAll(id)

        return res.json(messages)
    }

    async create(req, res){
        const { message, roomId } = req.body
        console.log(roomId)
        const addMessage = await MessageChatService.create(message, roomId, req.user.id)
        
        return res.json(addMessage)
    }
}

module.exports = new MessageChatController()