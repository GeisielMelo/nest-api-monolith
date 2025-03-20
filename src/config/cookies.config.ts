import { CookieOptions } from 'express'

export const cookiesConfig: { access: CookieOptions; refresh: CookieOptions } = {
  access: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 15),
  },
  refresh: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
}
