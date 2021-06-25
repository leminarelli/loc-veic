const express = require('express')

const UserController = require('./controllers/UserController')
const ReservationController = require('./controllers/ReservationController')
const CarsController = require('./controllers/CarsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/session', SessionController.create)

routes.get('/user', UserController.index)
routes.post('/user', UserController.create)

routes.get('/profile', ProfileController.index)

routes.get('/cars', CarsController.index)
routes.post('/cars', CarsController.create)
routes.delete('/cars/:id', CarsController.delete)

routes.get('/reservation', ReservationController.index)
routes.post('/reservation', ReservationController.create)

module.exports = routes
