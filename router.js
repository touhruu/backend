const Router = require('express')
const AnimeController = require('./controllers/AnimeController')
const GenreController = require('./controllers/GenreController')
const StatusController = require('./controllers/StatusController')
const CategoryController = require('./controllers/CategoryController')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')
const RoleController = require('./controllers/RoleController')
const VideoController = require('./controllers/VideoController')
const SeriaController = require('./controllers/SeriaController')
const BookmarkController = require('./controllers/BookmarkController')
const RoomController = require('./controllers/RoomController')
const MessageChatController = require('./controllers/MessageChatController')

const AuthMiddleware = require('./middleware/AuthMiddleware')
const RoleMiddleware = require('./middleware/RoleMiddleware')


const router = new Router()

router.get('/whoAmI', AuthMiddleware, UserController.whoAmI)

router.get('/anime', AnimeController.getAll)
router.post('/anime/add', AnimeController.create)
router.get('/anime/:id', AnimeController.oneAnime)
router.put('/anime/:id', AnimeController.update)
router.delete('/anime/:id', AnimeController.deleteAnime)
router.get('/rand-anime', AnimeController.randAnime)

router.get('/genres', GenreController.genreAll)
router.post('/genre/add', GenreController.create)
router.get('/genre/:id', GenreController.genreOne)
router.put('/genre/:id', GenreController.update)
router.delete('/genre/:id', GenreController.delete)

router.get('/status', StatusController.statusAll)
router.post('/status/add', StatusController.create)
router.get('/status/:id', StatusController.statusOne)
router.put('/status/:id', StatusController.update)
router.delete('/status/:id', StatusController.delete)

router.get('/category', CategoryController.categoryAll)
router.post('/category/add', CategoryController.create)
router.get('/category/:id', CategoryController.categoryOne)
router.put('/category/:id', CategoryController.update)
router.delete('/category/:id', CategoryController.delete)

router.get('/users', UserController.userAll)
router.get('/user/:id', UserController.userOne)
router.put('/user', AuthMiddleware, UserController.update)
router.delete('/user/:id', UserController.delete)
router.put('/addAvatar', AuthMiddleware, UserController.addAvatar)
router.put('/addBackgraund', AuthMiddleware, UserController.addBackgraund)
router.put('/updateUserMail', AuthMiddleware, UserController.updateUserMail)
router.put('/updateUserPass', AuthMiddleware, UserController.updateUserPass)

router.get('/roles', RoleController.roleAll)
router.post('/role/add', RoleController.create)
router.get('/role/:id', RoleController.roleOne)
router.put('/role/:id', RoleController.update)
router.delete('/role/:id', RoleController.delete)

router.post('/auth/reg', AuthController.registration)
router.post('/auth/log', AuthController.login)
router.get('/auth/users', RoleMiddleware(2), AuthController.getUsers)

router.get('/videos', VideoController.videoAll)
router.get('/video-last', VideoController.getLastVideo)
router.post('/video', VideoController.create)
router.get('/video/:id', VideoController.videoOne)
router.put('/video/:id', VideoController.update)
router.delete('/video/:id', VideoController.delete)

router.get('/seria', SeriaController.seriaAll)
router.post('/seria', SeriaController.create)
router.get('/seria/:id', SeriaController.seriaOne)
router.put('/seria/:id', SeriaController.update)
router.delete('/seria/:id', SeriaController.delete)

router.get('/bookmark', AuthMiddleware, BookmarkController.bookmarkAll)
router.post('/bookmark', AuthMiddleware, BookmarkController.create)
router.delete('/bookmark/:id', AuthMiddleware, BookmarkController.delete)

router.get('/room', RoomController.getAll)
router.post('/room', AuthMiddleware, RoomController.create)
router.post('/room/addUser', AuthMiddleware, RoomController.addUserInRoom)
router.get('/room/:url', RoomController.getByIdRoom)

router.get('/getMessage/:id', MessageChatController.getAll)
router.post('/addMessage', AuthMiddleware, MessageChatController.create)

module.exports = router
