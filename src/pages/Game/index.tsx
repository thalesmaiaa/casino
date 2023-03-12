import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { Container, Warning } from '../../components'
import { Props } from '../../components/Warning'
import {
  Game as GameType,
  updateBalance,
  useGamesState,
} from '../../store/games'
import { BalanceButton, BalanceContainer, Subtitle, Title } from './styles'

const initialState = {
  state: {
    open: false,
    vertical: 'top',
    horizontal: 'left',
    severity: 'error',
  },
  message: '',
  handleClose: () => {},
} as Props

export const Game = () => {
  const [warning, setWarning] = useState<Props>({
    state: {
      open: false,
      vertical: 'top',
      horizontal: 'left',
      severity: 'error',
    },
    message: '',
    handleClose: () => {},
  } as Props)
  const { state } = useLocation()
  const { name } = useParams<{ name: string }>()

  const currentBalance = parseInt(
    JSON.parse(localStorage.getItem(`@casino${name}`) as string),
  )
  const dispatch = useDispatch()

  const { balance } = useGamesState()

  const usageBalance = currentBalance || balance

  const { game } = state as GameType

  const handleCloseWarning = () => {
    setWarning(initialState)
  }

  const handleBalance = (value: string) => {
    const selectedValue = parseInt(value)

    const randomBool = Math.random() < 0.5

    if (randomBool) {
      const newBalanceValue = balance + 2 * selectedValue
      dispatch(updateBalance({ newBalance: newBalanceValue, game: name }))
      setWarning({
        state: {
          open: true,
          horizontal: 'left',
          vertical: 'top',
          severity: 'success',
        },
        message: 'You won the bet',
        handleClose: handleCloseWarning,
      })
    } else {
      const newBalanceValue = balance - selectedValue
      if (newBalanceValue >= 0) {
        dispatch(updateBalance({ newBalance: newBalanceValue, game: name }))

        setWarning({
          state: {
            open: true,
            horizontal: 'left',
            vertical: 'top',
            severity: 'error',
          },
          message: 'You lost the bet',
          handleClose: handleCloseWarning,
        })
      } else {
        setWarning({
          state: {
            open: true,
            horizontal: 'left',
            vertical: 'top',
            severity: 'error',
          },
          message: "You don't have enough money to bet",
          handleClose: handleCloseWarning,
        })
      }
    }
  }

  return (
    <Container
      sx={{
        minWidth: '600px',
        maxHeight: '1000px',
        border: '1px solid #121214',
        marginTop: '10px',
        padding: '100px 24px 40px',
        background: '#e1e1e6',
      }}
    >
      <Box
        width="100%"
        sx={{
          minHeight: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Box>
          <Title>{game.name}</Title>
          <Subtitle>{game.desc}</Subtitle>
        </Box>
        <Box sx={{ maxHeight: '650px' }}>
          <img alt="a" width="100%" height="100%" src={game.url} />
        </Box>
        <BalanceContainer>
          <Typography variant="h6">Balance: ${usageBalance}</Typography>
          <Stack spacing={10} direction="row">
            <BalanceButton
              variant="contained"
              onClick={() => handleBalance('1')}
            >
              $1
            </BalanceButton>
            <BalanceButton
              variant="contained"
              onClick={() => handleBalance('3')}
            >
              $3
            </BalanceButton>
            <BalanceButton
              variant="contained"
              onClick={() => handleBalance('5')}
            >
              $5
            </BalanceButton>
            <BalanceButton
              variant="contained"
              onClick={() => handleBalance('10')}
            >
              $10
            </BalanceButton>
          </Stack>
        </BalanceContainer>
      </Box>
      <Warning
        state={warning?.state}
        message={warning?.message}
        handleClose={warning?.handleClose}
      />
    </Container>
  )
}
