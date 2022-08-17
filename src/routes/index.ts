import express, { Router, Response, Request } from 'express'
import path from 'path'
import resizeApi from './Api/resizeApi'
const router: Router = express.Router()

// Useing Image Directory as Static files Serving

router.use('/images', express.static(path.join(__dirname, '..', '..', 'images')))
router.use(express.static(path.join(__dirname, '..', '..', 'resize')))

// Resize Api router

router.use('/images/resize', resizeApi)
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ Server: 'Image Processing Server' })
  res.end()
})

// Limit Other EndPoints
router.all('/*', (req: Request, res: Response) => {
  const invalidUrl: string = req.url
  res.status(404).json({ Error: '404 Not Found : '.concat(invalidUrl) })
  res.end()
})

export default router
