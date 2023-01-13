import type { ActionArgs } from '@remix-run/node'
import { auth } from '~/services/auth.server'

export const loader = async ({ request }: ActionArgs) => {
  await auth.logout(request, { redirectTo: '/' })
}
