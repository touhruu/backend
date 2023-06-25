const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { User } = require("../models/User")
const { Bookmark } = require("../models/Bookmark")

class UserService{
    async userAll(){
        const user = await User.findAll({
            include:{all: true, nested: true}
        })
        return user
    }

    async create(user){
        const userAdd = await User.create({...user, RoleId: 1})
        return userAdd
    }

    async userOne(userId){
        const user = await User.findOne({
            where: {id: userId},
            attributes: { exclude: ['password'] }
        })
        console.log(user)
        return user
    }

    async update(userId, user){
        const userOne = await User.findByPk(userId)
        const userUpdate = await userOne.update(user)
        return userUpdate
    }

    async delete(userId){
        const user = await User.findByPk(userId)
        
        if(user){
            const userDelete = await user.destroy()
            return userDelete
        }
        else{
            throw new Error('user was not found')
        }
    }

    async addAvatar(file, userId){
        const avatar = await User.findByPk(userId)

        const fileExtention = path.extname(file.name);
        const fileName = uuidv4() + fileExtention;
        const uploadPath = path.resolve(__dirname, '..', 'avatars', fileName);
        file.mv(uploadPath, (err) => {
            if(err) throw new Error('file error');
        })

        const user = await avatar.update({ avatar: fileName })
        console.log(user.avatar)
        return user.avatar
    }

    async addBackgraund(file, userId){
        const backgraund = await User.findByPk(userId)

        const fileExtention = path.extname(file.name);
        const fileName = uuidv4() + fileExtention;
        const uploadPath = path.resolve(__dirname, '..', 'backgraund', fileName);
        file.mv(uploadPath, (err) => {
            if(err) throw new Error('file error');
        })

        const user = await backgraund.update({ backgraund: fileName })
        return user.backgraund
    }

    //функция для обновления данных с обязательной проверкой ввведенного пароля
    async updateUserMail(user, userId){
        if(user.password !== ""){
            
            const userOne = await User.findByPk(userId)
            const validPass = bcrypt.compareSync(user.password, userOne.password)

            if(validPass){
                const userUpdate = await userOne.update({ email: user.email })
                console.log(userUpdate.email)
                return userUpdate.email
            }
            else
            {
                throw new Error('incorrect password')
            }
        }
        else{
            throw new Error('user was not update')
        }
    }

    async updateUserPass(user, userId){
        if(user.password !== "" && user.newPassword !== ""){
            const userOne = await User.findByPk(userId)
            const validPass = bcrypt.compareSync(user.password, userOne.password)
            console.log(user.password)
            console.log(userOne.password)
            if(validPass){
                const hashPass = bcrypt.hashSync(user.newPassword, 2)
                const userUpdate = await userOne.update({ password: hashPass })
                return userUpdate.password
            }
            else
            {
                throw new Error('incorrect password')
            }
        }
        else{
            throw new Error('user was not update')
        }
    }
}

module.exports = new UserService()