import { Box, type BoxProps } from '@chakra-ui/react'

interface PromptProps extends BoxProps {
  prompt: string
}

export const Prompt = ({ prompt }: PromptProps) => {
  return (
    <Box
      w="full"
      p="4"
      color="gray.500"
      border="1px"
      borderColor="gray.400"
      bgColor="white"
      rounded="md"
    >
      {prompt}
    </Box>
  )
}
