const CategoryService = require('../services/CategoryService')

class CategoryController{
    async categoryAll(_, res){
        const category = await CategoryService.categoryAll()
        res.json(category)
    }

    async create(req, res){
        const category = await CategoryService.create(req.body)
        res.json(category)
    }

    async categoryOne(req, res){
        const {id} = req.params
        const category = await CategoryService.categoryOne(id)
        res.json(category)
    }

    async update(req, res){
        const {id} = req.params
        const category = await CategoryService.update(id, req.body)
        res.json(category)
    }

    async delete(req, res){
        const {id} = req.params
        try{
            const category = await CategoryService.delete(id)
            res.json(category)
        }
        catch(e){
            res.status(404).json({
                message: e.message
            })
        }
    }
}

module.exports = new CategoryController()