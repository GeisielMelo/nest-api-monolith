import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

const URL_DEVELOPMENT = 'http://localhost:3010'
const URL_PRODUCTION = process.env.APP_CLIENT_URL

export const corsConfig: CorsOptions = {
  origin: process.env.NODE_ENV === 'production' ? URL_PRODUCTION : URL_DEVELOPMENT,
  methods: 'GET,PUT,PATCH,POST,DELETE',
  credentials: true,
}
