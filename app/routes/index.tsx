import { Grid, Heading, Box, Button, Center, Link } from '@chakra-ui/react'
import { useFetcher } from '@remix-run/react'

export default function Index() {
  const fetcher = useFetcher()
  return (
    <Grid templateRows="auto 1fr auto" minH="100vh">
      <Heading p="4">Open AI Example</Heading>
      <Center>
        <fetcher.Form action="/auth/google" method="get">
          <Button
            colorScheme="blue"
            isLoading={fetcher.state === 'submitting'}
            type="submit"
          >
            Google アカウントで続ける
          </Button>
        </fetcher.Form>
      </Center>

      <Box as="footer" p="4" textAlign="center">
        Copyright &copy;{' '}
        <Link color="blue.500" fontWeight="bold" href="https://www.techtalk.jp">
          TechTalk inc.
        </Link>
      </Box>
    </Grid>
  )
}
