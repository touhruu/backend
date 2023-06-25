const AnimeService = require('../services/AnimeService')

class AnimeController {
    async getAll(req, res){
        const anime = await AnimeService.getAll()
        res.json(anime)
    }

    async create(req, res){
        const {
            name,
            description,
            release_ani,
            duration,
            age_limit,
            statusId,
            categoryId,
            genres
        } = req.body;
        const anime = await AnimeService.create({ name, description, release_ani, duration, age_limit }, req.files.picture, statusId, categoryId, JSON.parse(`[${genres}]`))
        res.json(anime)
    }

    async oneAnime(req, res){
        const {id} = req.params
        console.log(id)
        const anime = await AnimeService.oneAnime(id)
        res.json(anime)
    }

    async update(req, res){
        const {id} = req.params
        const {
            updateAnime,
            statusId,
            categoryId,
            genres
        } = req.body;
        const anime = await AnimeService.update(id, updateAnime, statusId, categoryId, genres)
        res.json(anime)
    }

    async deleteAnime(req, res){
        const {id} = req.params
        try{
            const deletedAnime = await AnimeService.deleteAnime(id)
            res.json(deletedAnime)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }

    async randAnime(req, res){
        const anime = await AnimeService.randAnime()
        res.json(anime)
    }
}

module.exports = new AnimeController()