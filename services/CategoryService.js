const { Category } = require('../models/Category')

class CategoryService{
    async categoryAll(){
        const category = await Category.findAll()
        return category
    }

    async create(category){
        const categoryAdd = await Category.create(category)
        return categoryAdd
    }

    async categoryOne(categoryId){
        const category = await Category.findByPk(categoryId)
        return category
    }

    async update(categoryId, category){
        const categoryOne = await Category.findByPk(categoryId)
        const categoryUpdate = await categoryOne.update(category)
        return categoryUpdate
    }

    async delete(categoryId){
        const category = await Category.findByPk(categoryId)
        
        if(category){
            const categoryDelete = await category.destroy()
            return categoryDelete
        }
        else{
            throw new Error('category was not found')
        }
    }
}

module.exports = new CategoryService()