import { createCookieSessionStorage } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from 'remix-auth-google'
import invariant from 'tiny-invariant'

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET is required')
invariant(process.env.GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_ID is required')
invariant(process.env.GOOGLE_CLIENT_SECRET, 'GOOGLE_CLIENT_SECRET is required')

export interface SessionUser {
  id: string
  displayName: string
  email: string
  photoURL: string
  hd: string
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const auth = new Authenticator<SessionUser>(sessionStorage)

auth.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async ({ profile }) => {
      return {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photoURL: profile.photos[0].value,
        hd: profile._json.hd,
      }
    },
  ),
)
