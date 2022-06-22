import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import router from './routes/index'

dotenv.config()

const app: Application = express()

//Secure Http Headers With By Setting Some  Verious Values And Xss Filter

app.use(helmet())

//Logging Http Requests
app.use(morgan('dev'))

// Useing Routes And Api
app.use(router)

// start Image Processing Api server

const PORT: string | number = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`[+] Server Listening Now at Port : ${PORT} `)
})

export default app
