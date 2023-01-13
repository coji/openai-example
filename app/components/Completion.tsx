import { Box, type BoxProps, Flex } from '@chakra-ui/react'
import type { CreateCompletionResponse } from 'openai'
import { match } from 'ts-pattern'
// {
//   id: 'cmpl-6Y68kFNfDdK3fS7a4NJYwQgvdRjRG',
//   object: 'text_completion',
//   created: 1673584774,
//   model: 'text-davinci-003',
//   choices: [
//     {
//       text: 'る記号の名前\n\n|',
//       index: 0,
//       logprobs: null,
//       finish_reason: 'length',
//     },
//   ],
//   usage: { prompt_tokens: 1, completion_tokens: 14, total_tokens: 15 },
// }

const modelPrice = (model: string) =>
  match(model)
    .with('text-davinci-003', () => '$0.0200 / 1K tokens')
    .otherwise(() => 'unknown')

interface CompletionProps extends BoxProps {
  completion: CreateCompletionResponse
}
export const Completion = ({ completion }: CompletionProps) => {
  return (
    <Box w="full" p="4" color="gray.200" bgColor="black" rounded="md">
      <Box>{completion.choices.map((choice) => choice.text)}</Box>

      {completion.usage && (
        <Flex justify="space-between" w="auto" color="gray.500" fontSize="xs">
          <Box>
            <Box>model: {completion.model}</Box>
            <Box>price: {modelPrice(completion.model)}</Box>
          </Box>
          <details>
            <summary> usage: {completion.usage.total_tokens} tokens</summary>
            <Box>prompt: {completion.usage.prompt_tokens}</Box>
            <Box>completion: {completion.usage.completion_tokens}</Box>
          </details>
        </Flex>
      )}
    </Box>
  )
}
