import { Router } from 'express'
import multer from 'multer'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvaiableCarsController } from '@modules/cars/useCases/listAvaiableCars/ListAvaiableCarsController'
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController'

import uploadConfig from '@config/upload'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()
const upload = multer(uploadConfig.upload('./tmp/cars'))

const createCarController = new CreateCarController()
const listAvaiableCarsControlle = new ListAvaiableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImageController()

carsRoutes.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle)

carsRoutes.get('/avaiable', listAvaiableCarsControlle.handle)

carsRoutes.post('/specifications/:id', ensureAuthenticate, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post('/images/:id', ensureAuthenticate, ensureAdmin, upload.array('images'), uploadCarImagesController.handle)

export { carsRoutes }
