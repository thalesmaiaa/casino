import { useAuthState } from '../../store/auth'

import { Fade, Typography } from '@mui/material'

import { Container, GamesContainer, Warning } from '../../components'

import { HomeContent, Subtitle } from './styles'
import { useEffect, useState } from 'react'
import { Props } from '../../components/Warning'

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

export const Home = () => {
  const {
    user: { name },
    status,
  } = useAuthState()

  const handleCloseWarning = () => {
    setWarning(initialState)
  }

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

  useEffect(() => {
    if (status === 'loggedOut') {
      setWarning({
        state: {
          open: true,
          horizontal: 'left',
          vertical: 'bottom',
          severity: 'info',
        },
        message: 'You must be logged for click in the games',
        handleClose: handleCloseWarning,
      })
    }
  }, [status])

  return (
    <Container>
      <HomeContent>
        {name && status === 'authenticated' && (
          <Fade in={true} timeout={1000}>
            <Typography variant="h3">{name + ','}</Typography>
          </Fade>
        )}

        <Typography variant="h2">welcome to the casino</Typography>

        <Subtitle>Check some of our most popular games</Subtitle>
        <GamesContainer
          page="landing"
          routeTo={status === 'authenticated' ? '/games' : '/'}
        />
      </HomeContent>
      <Warning
        state={warning?.state}
        message={warning?.message}
        handleClose={warning?.handleClose}
      />
    </Container>
  )
}
