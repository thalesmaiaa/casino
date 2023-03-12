import { Box, Button, styled, Typography } from '@mui/material'

export const Title = styled(Typography)`
  color: #121214;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
`

export const Subtitle = styled(Typography)`
  color: #121214;
  font-size: 1.5rem;
  margin-bottom: 10px;
`

export const BalanceContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10rem;

  h6 {
    font-weight: 500;
    color: #121214;
  }
`

export const BalanceButton = styled(Button)`
  color: #fff;
  background: #00b37e;

  &:hover {
    color: #00b373;
    background: #fff;
  }
`
