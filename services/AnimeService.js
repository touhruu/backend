const { Sequelize } = require('sequelize');
const path = require('path');
const { Anime } = require('../models/Anime')
const { Category } = require('../models/Category')
const { Genre } = require('../models/Genre');
const { Seria } = require('../models/Seria');
const { Status } = require('../models/Status')
const { Video } = require('../models/Video')

class AnimeService{
    async getAll(){
        const anime = await Anime.findAll({
            attributes: ['id', 'name', 'release_ani', 'duration', 'age_limit', 'picture'],
            include: [Status, Category, Genre]
        })
        return anime
    }

    async create(anime, file, statusId, categoryId, genres){
        const status = await Status.findByPk(statusId)
        const category = await Category.findByPk(categoryId)
        if(!status) {
            throw new Error("Status was not found");
        }

        if(!category) {
            throw new Error("Category was not found");
        }
        const uploadPath = path.resolve(__dirname, '..', 'poster', file.name);
        file.mv(uploadPath, (err) => {
            if(err) throw new Error('file error');
        })
        const animeCreate = await Anime.create({...anime, picture: file.name, StatusId: statusId, CategoryId: categoryId})
        for(let i = 0; i < genres.length; i++){
            await animeCreate.addGenre(genres[i]);
        }
        
        return animeCreate
    }

    async oneAnime(animeId){
        const anime = await Anime.findByPk(animeId, {
            include: [Status, Genre, Category]
        })

        const seria = await Seria.findAll({
            where: {AnimeId: animeId},
            include: [Video],
            order: [
                ['position', 'DESC']
            ]
        })
        return {...anime.toJSON(), seria}
    }

    async update(animeId, anime, statusId, categoryId, genres ){
        const animeOne = await Anime.findByPk(animeId)
        const status = await Status.findByPk(statusId)
        const category = await Category.findByPk(categoryId)
        if(!status) {
            throw new Error("Status was not found");
        }

        if(!category) {
            throw new Error("Category was not found");
        }

        const updateAnime = await animeOne.update({...anime, StatusId: statusId, CategoryId: categoryId})
        if(genres && genres.length > 0) {
            await updateAnime.setGenres(genres);
        }
        
        return updateAnime
    }

    async deleteAnime(animeId){
        const anime = await Anime.findByPk(animeId)
        if(anime){
            const deletedAnime = await anime.destroy()
            return deletedAnime
        }
        else{
            throw new Error('anime was not found')
        }
    }

    async randAnime(){
        const anime = await Anime.findOne({
            attributes: ['id', 'name', 'release_ani', 'duration', 'age_limit', 'picture', 'description'],
            include: [Status, Category, Genre],
            order: Sequelize.literal('rand()'),
            limit: 1
        })

        console.log(anime.id)
        const seria = await Seria.findAll({
            where: {AnimeId: anime.id},
            include: [Video],
            order: [
                ['position', 'DESC']
            ]
        })

        return { ...anime.toJSON(), seria }
    }
}

module.exports = new AnimeService