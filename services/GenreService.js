const { Genre } = require("../models/Genre")

class GenreService{
    async genreAll(){
        const genre = await Genre.findAll()
        return genre
    }

    async create(genre){
        const genreAdd = await Genre.create(genre)
        return genreAdd
    }

    async genreOne(genreId){
        const genre = await Genre.findByPk(genreId)
        return genre
    }

    async update(genreId, genre){
        const genreOne = await Genre.findByPk(genreId)
        const genreUpdate = await genreOne.update(genre)
        return genreUpdate
    }

    async delete(genreId){
        const genre = await Genre.findByPk(genreId)
        
        if(genre){
            const genreDelete = await genre.destroy()
            return genreDelete
        }
        else{
            throw new Error('genre was not found')
        }
    }
}

module.exports = new GenreService()