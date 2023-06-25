const bcrypt = require('bcrypt');
const { User } = require('../models/User')
const UserService = require('./UserService')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../key')

const generateAccessToken = (id, roles) =>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secretKey, {expiresIn: '24h'})
}

class AuthService{
    async registration(user){
        const candidate = await User.findOne({where: {email: user.email}})
        if(candidate){
            throw new Error('Email занят')
        }
        const { password } = user
        if(!password){
            throw new Error('Введите пароль')
        }
        const hashPass = bcrypt.hashSync(password, 2)
        const userAdd = await UserService.create({...user, password: hashPass})
        return userAdd
    }

    async login(user){
        const { email, password: userPassword } = user //userPassword - это другое название переменной
        const userSearch = await User.findOne({
            where: {
                email
            },
            raw: true
        })

        if(!userSearch){
            throw new Error('Неверный Email')
        }
        const validPass = bcrypt.compareSync(userPassword, userSearch.password)
        if(!validPass){
            throw new Error('Неверный пароль')
        }
        // console.log(userSearch)
        const token = generateAccessToken(userSearch.id, userSearch.RoleId)
        const { password, ...userModel } = userSearch // ...userModel rest оператор
        console.log(userModel)
        return {
            token: token,
            user: userModel
        }
    }

    async getUsers(user){
        const getUser = await User.findAll({
            include:{all: true, nested: true}
        })
        return getUser
    }
}

module.exports = new AuthService()