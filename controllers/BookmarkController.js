const BookmarkService = require('../services/BookmarkService')

class BookmarkController{
    async bookmarkAll(req, res){
        const bookmark = await BookmarkService.bookmarkAll(req.user.id)
        res.json(bookmark)
    }

    async create(req, res){
        const { bookmarkType, animeId } = req.body
        const bookmark = await BookmarkService.create(bookmarkType, animeId, req.user.id)
        res.json(bookmark)
    }

    async bookmarkOne(req, res){
        const {id} = req.params
        const bookmark = await BookmarkService.bookmarkOne(id)
        res.json(bookmark)
    }

    async delete(req, res){
        const {id} = req.params
        try{
            const bookmark = await BookmarkService.delete(id, req.user.id)
            res.json(bookmark)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = new BookmarkController()