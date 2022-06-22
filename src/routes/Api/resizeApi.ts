//import { json } from 'body-parser';
import express, { Router, Response, Request } from 'express'
import path from 'path'
import resizeUtil from '../../utils/resizeUtil'
import fs from 'fs'

const resizeApi: Router = express.Router()

const imagesCollection: Array<string> = [
  'palmtunnel',
  'icelandwaterfall',
  'encenadaport',
  'santamonica',
  'fjord'
]

interface params {
  name?: string
  height?: string
  width?: string
}

resizeApi.get('/', async (req: Request, res: Response) => {
  const resizeApiParams: params = req.query

  const height: number = parseInt(resizeApiParams.height as string)
  const width: number = parseInt(resizeApiParams.width as string)
  const name: string = resizeApiParams.name as string

  if (typeof name == 'string' && imagesCollection.includes(name)) {
    if (typeof height == 'number' && height > 0) {
      if (typeof width == 'number' && width > 0) {
        const resizedImage: string = path.join(
          __dirname,
          '..',
          '..',
          '..',
          'resize',
          name.concat('_', height.toString(), '_', width.toString(), '.jpg')
        )
        try {
          if (await resizeUtil(name, height, width)) {
            // res.json({"Resized":"Successed"})

            const imageData: Buffer = fs.readFileSync(resizedImage, { flag: 'r' })

            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            res.write(imageData)
            res.end()
          } else {
            res.status(500).json({ Error: 'Some Error Happened ...' })
          }
        } catch (err) {
          res.status(400).json({ Error: 'Some Error Happened ...' })
          return false
        }
      } else {
        // Handle unvaild Width value
        res.status(400).json({ Error: 'please enter a vaild width' })
        res.end()
      }
    } else {
      // Handle unvaild height value
      res.status(400).json({ Error: 'please enter a vaild height' })
      res.end()
    }
  } else {
    // Handle unvaild image name value
    res.status(400).json({ Error: 'please enter a vaild image name' })
    res.end()
  }

  res.end()
})

export default resizeApi
