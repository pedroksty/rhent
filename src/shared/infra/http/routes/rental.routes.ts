import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'
import { Router } from 'express'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticated'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalRoutes.post('/', ensureAuthenticate, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAuthenticate, devolutionRentalController.handle)


export { rentalRoutes }