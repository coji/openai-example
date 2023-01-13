import type { LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { auth } from '~/services/auth.server'

export const loader = async ({ request, params }: LoaderArgs) => {
  invariant(params.provider, 'Provider is required')
  return await auth.authenticate(params.provider, request, {
    successRedirect: '/chat',
    failureRedirect: '/',
  })
}
