import { registerAs } from '@nestjs/config'

export default registerAs('tmdb', () => ({
  key: process.env.TMDB_API_KEY,
}))
