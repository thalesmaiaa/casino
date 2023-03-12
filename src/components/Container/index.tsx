import { ContainerProps } from '@mui/material'
import { ReactNode } from 'react'

import { StyledContainer } from './styles'

type Props = {
  children: ReactNode
} & ContainerProps

const Container = ({ children, ...rest }: Props) => {
  return <StyledContainer {...rest}>{children}</StyledContainer>
}

export default Container
