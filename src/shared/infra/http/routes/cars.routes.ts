import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvaiableCarsController } from '@modules/cars/useCases/listAvaiableCars/ListAvaiableCarsController'
import { Router } from 'express'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvaiableCarsControlle = new ListAvaiableCarsController()

carsRoutes.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle)

carsRoutes.get('/avaiable', listAvaiableCarsControlle.handle)

export { carsRoutes }
