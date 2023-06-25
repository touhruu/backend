const { Role } = require("../models/Role")

class RoleService{
    async roleAll(){
        const role = await Role.findAll()
        return role
    }

    async create(role){
        const roleAdd = await Role.create(role)
        return roleAdd
    }

    async roleOne(roleId){
        const role = await Role.findByPk(roleId)
        return role
    }

    async update(roleId, role){
        const roleOne = await Role.findByPk(roleId)
        const roleUpdate = await roleOne.update(role)
        return roleUpdate
    }

    async delete(roleId){
        const role = await Role.findByPk(roleId)
        
        if(role){
            const roleDelete = await role.destroy()
            return roleDelete
        }
        else{
            throw new Error('role was not found')
        }
    }
}

module.exports = new RoleService()