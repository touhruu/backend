const { Bookmark } = require('../models/Bookmark')
const { Anime } = require('../models/Anime')
const { User } = require('../models/User')

class BookmarkService{

    async bookmarkAll(userId){
        const bookmark = await Bookmark.findAll({
                where: {UserId: userId},
                include: { all: true, nested: true }
            })
        return bookmark
    }

    async create(bookmarkType, animeId, userId){
        const anime = Anime.findByPk(animeId)
        const user = User.findByPk(userId)

        if(!anime) {
            throw new Error("Anime was not found");
        }

        if(!user) {
            throw new Error("User was not found");
        }

        const bookmark = await Bookmark.findOne({
                where: {AnimeId: animeId, UserId: userId},
        })

        if(bookmark){
            console.log(bookmark.id)
            await this.delete(bookmark.id, userId)
            const bookmarkAdd = await Bookmark.create({ bookmarkType, AnimeId: animeId, UserId: userId})
            return bookmarkAdd
        }
        else{
            const bookmarkAdd = await Bookmark.create({ bookmarkType, AnimeId: animeId, UserId: userId})
            return bookmarkAdd
        }
    }

    async bookmarkOne(bookmarkId){
        const bookmark = await Bookmark.findByPk(bookmarkId)
        return bookmark
    }

    async delete(bookmarkId, userId){
        const bookmark = await Bookmark.findOne({
            where: {id: bookmarkId, UserId: userId},
        })
        
        if(bookmark){
            const bookmarkDelete = await bookmark.destroy()
            return bookmarkDelete
        }
        else{
            throw new Error('bookmark was not found')
        }
    }
}

module.exports = new BookmarkService()