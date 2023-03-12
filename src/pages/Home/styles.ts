import { Avatar, Box, Container, styled, Typography } from '@mui/material'

export const HomeContainer = styled(Container)`
  padding: 10rem 0rem;
  display: flex;
  justify-content: center;
`

export const HomeContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    text-transform: uppercase;
  }

  h3 {
    font-family: 'Lobster', cursive;
  }
`

export const Subtitle = styled(Typography)`
  font-size: 2rem;
  color: #00b37e;
  text-transform: uppercase;
`

export const GamesContainer = styled(Box)`
  padding: 3rem 0rem;
`

type AvatarProps = {
  background?: string
}

export const Game = styled(Avatar)<AvatarProps>`
  background: ${(props) => props.background || 'gray'};

  &:hover {
    cursor: pointer;
  }
`
