const GenreService = require('../services/GenreService')

class GenreController{
    async genreAll(req, res){
        const genre = await GenreService.genreAll()
        res.json(genre)
    }

    async create(req, res){
        const genre = await GenreService.create(req.body)
        res.json(genre)
    }

    async genreOne(req, res){
        const {id} = req.params
        const genre = await GenreService.genreOne(id)
        res.json(genre)
    }

    async update(req, res){
        const {id} = req.params
        const genre = await GenreService.update(id, req.body)
        res.json(genre)
    }

    async delete(req, res){
        const {id} = req.params
        try{
            const genre = await GenreService.delete(id)
            res.json(genre)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = new GenreController()