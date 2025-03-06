import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
  access: process.env.JWT_ACCESS_SECRET,
  refresh: process.env.JWT_REFRESH_SECRET,
}))
