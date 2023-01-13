import type { SessionUser } from '~/services/auth.server'
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Avatar,
  type BoxProps,
} from '@chakra-ui/react'
import { useNavigate } from '@remix-run/react'

interface UserProps extends BoxProps {
  user?: SessionUser
}
export const UserAvatar = ({ user }: UserProps) => {
  const navigate = useNavigate()
  if (!user) return <></>
  return (
    <Menu>
      <MenuButton as={Avatar} size="sm" src={user.photoURL}>
        {user.displayName}
      </MenuButton>
      <MenuList fontSize="md">
        <MenuItem display="block" color="gray.500">
          <Box>{user.displayName}</Box>
          <Box fontSize="sm">{user.email}</Box>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            navigate('/logout', { replace: true })
          }}
        >
          サインアウト
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
