const express = require('express')
const fileUpload = require('express-fileupload')
const { json } = require('express')
const { sequelize } = require('./dbcon')
const { Anime } = require('./models/Anime')
const { Category } = require('./models/Category')
const { Status } = require('./models/Status')
const { Role } = require('./models/Role')
const { User } = require('./models/User')
const { Video } = require('./models/Video')
const { Seria } = require('./models/Seria')
const { Room } = require('./models/Room')
// const { UsersInTheRoom } = require('./models/UsersInTheRoom')
const router = require('./router')
const app = express()
const cors = require('cors')
const http = require('http')
const { MessageChat } = require('./models/MessageChat')

const server = http.createServer(app)

const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:8080',
    credentials: true
  }
});

io.on('connection', (socket) => {

  console.log('a user connected')

    socket.on('addRoom', (numberRoom) => {
        socket.join(numberRoom)
    })

    socket.on('newMessage', () => {
      socket.emit('message')
    })

    socket.on('setPlay', () => {
        socket.local.emit('play')
    })

    socket.on('setPause', () => {
        socket.local.emit('pause')
    })
})

async function bootstrap(){
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      await Anime.sync({force: true});
      await Status.sync({force: true});
      await Category.sync({force: true});
      await User.sync({force: true});
      await Role.sync({force: true});
      await Video.sync({force: true});
      await Seria.sync({force: true});
      await Bookmark.sync({force: true});
      await Room.sync({force: true});
      // await UsersInTheRoom.sync({force: true});
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    const corsOptions = {
      origin: ["http://localhost:8080", "http://141.8.194.146"],
      optionsSuccessStatus: 200,
      credentials: true
    }

    app.use(json());
    app.use(express.static('videos'))
    app.use(express.static('avatars'))
    app.use(express.static('backgraund'))
    app.use(express.static('poster'))
    app.use(cors(corsOptions));
    app.use(fileUpload({}))
    app.use('/api', router)
    

    server.listen(3000, () => {
        console.log('Сервер был запущен, кусь')
    })
}

bootstrap()




// app.get('/api/films', (req, res) => {
//     const films = [
//         {
//             id: 1,
//             name: 'Фильм 1',
//             picture: 'https://animego.org/media/cache/thumbs_250x350/upload/anime/images/633e7f7448591100276578.jpg',
//             episodes: 12,
//             year: 2019,
//             genre: [
//                 { id: 1, name: 'Детектив' },
//                 { id: 2, name: 'Триллер' },
//                 { id: 3, name: 'Гарем' }
//             ],
//             status: 'Вышел',
//             category: 'Фильм'
//         },
//         {
//             id: 2,
//             name: 'Фильм 2',
//             picture: 'https://animego.org/media/cache/thumbs_250x350/upload/anime/images/633e7f7448591100276578.jpg',
//             episodes: 11,
//             year: 2020,
//             genre: [
//                 { id: 1, name: 'Детектив' },
//                 { id: 2, name: 'Триллер' },
//                 { id: 3, name: 'Гарем' }
//             ],
//             status: 'Вышел',
//             category: 'Сериал'
//         },
//         {
//             id: 3,
//             name: 'Фильм 3',
//             picture: 'https://animego.org/media/cache/thumbs_250x350/upload/anime/images/633e7f7448591100276578.jpg',
//             episodes: 12,
//             year: 2019,
//             genre: [
//                 { id: 1, name: 'Детектив' },
//                 { id: 2, name: 'Триллер' },
//                 { id: 3, name: 'Гарем' }
//             ],
//             status: 'Онгоинг',
//             category: 'Фильм'
//         },
//         {
//             id: 4,
//             name: 'Фильм 4',
//             picture: 'https://animego.org/media/cache/thumbs_250x350/upload/anime/images/633e7f7448591100276578.jpg',
//             episodes: 12,
//             year: 2022,
//             genre: [
//                 { id: 1, name: 'Детектив' },
//                 { id: 2, name: 'Триллер' },
//                 { id: 2, name: 'Гарем' }
//             ],
//             status: 'Вышел',
//             category: 'Сериал'
//         }
//     ];
//     res.json(films)
// })

// app.get('/api/onefilm/:id', (req, res) => {
//     const fullFilms = [
//         {
//             id: 1,
//             name: 'Фильм 1',
//             picture: 'https://animego.org/media/cache/thumbs_250x350/upload/anime/images/633e7f7448591100276578.jpg',
//             episodes: 12,
//             year: 2019,
//             status: 'вышел',
//             age: 18,
//             type: 1,
//             genres: [
//                 { id: 1, name: 'Детектив' },
//                 { id: 2, name: 'Триллер' },
//                 { id: 3, name: 'Еще что-то' }
//             ],
//             producer: 'какой-то',
//             studio: 'какая-то',
//             duration: 23
//         },
//         {
//             id: 2,
//             name: 'Фильм 2',
//             picture: 'https://animego.org/media/cache/thumbs_250x350/upload/anime/images/633e7f7448591100276578.jpg',
//             episodes: 12,
//             year: 2020,
//             status: 'вышел',
//             age: 18,
//             type: 1,
//             genres: [
//                 { id: 1, name: 'Детектив' },
//                 { id: 2, name: 'Триллер' },
//                 { id: 3, name: 'Гарем' }
//             ],
//             producer: 'какой-то',
//             studio: 'какая-то',
//             duration: 23
//         },
//          {
//             id: 2,
//             name: 'Фильм 2',
//             picture: 'https://animego.org/media/cache/thumbs_250x350/upload/anime/images/633e7f7448591100276578.jpg',
//             episodes: 12,
//             year: 2020,
//             status: 'вышел',
//             age: 18,
//             type: 1,
//             genres: [
//                 { id: 1, name: 'Детектив' },
//                 { id: 2, name: 'Триллер' },
//                 { id: 3, name: 'Гарем' }
//             ],
//             producer: 'какой-то',
//             studio: 'какая-то',
//             duration: 23
//         },
//     ];
//     res.json(fullFilms.find((elem) => elem.id === parseInt(req.params.id)))
//     // console.log()
// })

// app.get('/api/genres', (req, res) => {
//     const genres = [
//         { id: 1, name: 'Детектив' },
//         { id: 2, name: 'Триллер' },
//         { id: 3, name: 'Психология' },
//         { id: 4, name: 'Фентези' },
//         { id: 5, name: 'Мистика' },
//         { id: 6, name: 'Магия' },
//         { id: 7, name: 'Исторический' },
//         { id: 8, name: 'Комедия' },
//         { id: 9, name: 'Драма' },
//         { id: 10, name: 'Гарем' },
//         { id: 11, name: 'Хентай' }
//     ];
//     res.json(genres)
// })

// app.get('/api/status', (req, res) => {
//     const status = [
//         {id: 1, name: 'Вышел'},
//         {id: 2, name: 'Анонс'},
//         {id: 3, name: 'Онгоинг'}
//     ];
//     res.json(status)
// })

// app.get('/api/category', (req, res) => {
//     const category = [
//         {id: 1, name: 'Сериал'},
//         {id: 2, name: 'Фильм'},
//         {id: 3, name: 'OVA'},
//         {id: 3, name: 'ONA'}
//     ];
//     res.json(category)
// })

// app.use((req, res) => {
//     res.status(404)
// })


