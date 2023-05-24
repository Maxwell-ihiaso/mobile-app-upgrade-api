import { type CorsOptions } from 'cors'
import allowedOrigins from './allowedOrigins'

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if ((origin != null && allowedOrigins.includes(origin)) ?? origin == null) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

export default corsOptions
