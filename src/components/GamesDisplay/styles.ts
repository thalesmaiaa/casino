import { Avatar, Box, styled } from '@mui/material'

export const GamesContainer = styled(Box)`
  padding: 3rem 0rem;

  h6 {
    color: #00b37e;
    margin-top: 100px;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;

      cursor: pointer;
    }
  }
`

export const GameArea = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  min-width: 300px;
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
