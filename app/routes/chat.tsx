import {
  Heading,
  Grid,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import { Configuration, OpenAIApi } from 'openai'
import { json, type ActionArgs, type LoaderArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { Prompt } from '~/components/Prompt'
import { Completion } from '~/components/Completion'
import { UserAvatar } from '~/components/UserAvatar'
import { auth } from '~/services/auth.server'

export const loader = async ({ request }: LoaderArgs) => {
  const user = await auth.isAuthenticated(request, {
    failureRedirect: '/',
  })
  return json({ user })
}

const recruiteLetterPrompt = `
あなたは IT 企業のCTO です。
これから GitHub で見つけた有望なソフトウェアエンジニアに対して、具体的な言葉でスカウトメールを送らなければなりません。
スカウトメールの文面を考えてください。
なるべく丁寧に、かつ完結に伝える必要があるので、120文字以内で書いてください。
相手の名前は *** です。
`

export const action = async ({ request }: ActionArgs) => {
  await auth.isAuthenticated(request, {
    failureRedirect: '/',
  })

  const formData = await request.formData()
  const prompt = formData.get('prompt')?.toString()
  if (!prompt) {
    return json({ prompt: null, completion: null })
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const completion = await openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: recruiteLetterPrompt.replace('***', prompt),
      max_tokens: 200,
      temperature: 0,
    })
    .catch((e) => {
      return null
    })

  if (!completion) {
    throw new Error('error!')
  }

  return json({ prompt, completion: completion.data })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>()

  return (
    <Grid templateRows="auto 1fr" minH="100dvh" p="4">
      <Heading display="flex">
        <Box flexGrow="1">Open AI Example</Box>
        <UserAvatar user={user} />
      </Heading>

      <Grid gap="4" templateRows="1fr auto" minH="full">
        <VStack>
          {fetcher.data?.prompt && <Prompt prompt={fetcher.data.prompt} />}
          {fetcher.data?.completion && (
            <Completion completion={fetcher.data.completion} />
          )}
        </VStack>

        <fetcher.Form method="post">
          <VStack w="full">
            <FormControl alignItems="center" display="flex" w="full">
              <FormLabel>Prompt</FormLabel>
              <Input autoFocus name="prompt" />
            </FormControl>

            <Button
              w="full"
              colorScheme="blue"
              isLoading={fetcher.state === 'submitting'}
              type="submit"
            >
              送信
            </Button>
          </VStack>
        </fetcher.Form>
      </Grid>
    </Grid>
  )
}
