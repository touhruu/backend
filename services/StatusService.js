const { Status } = require("../models/Status")

class StatusService{
    async statusAll(){
        const status = await Status.findAll()
        return status
    }

    async create(status){
        const statusAdd = await Status.create(status)
        return statusAdd
    }

    async statusOne(statusId){
        const status = await Status.findByPk(statusId)
        return status
    }

    async update(statusId, status){
        const statusOne = await Status.findByPk(statusId)
        const statusUpdate = await statusOne.update(status)
        return statusUpdate
    }

    async delete(statusId){
        const status = await Status.findByPk(statusId)
        
        if(status){
            const statusDelete = await status.destroy()
            return statusDelete
        }
        else{
            throw new Error('status was not found')
        }
    }
}

module.exports = new StatusService()