import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { openModal } from '../../store/general'
import { logout, useAuthState } from '../../store/auth'

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import CasinoIcon from '@mui/icons-material/Casino'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

export const Navbar = () => {
  const dispatch = useDispatch()

  const { status, user } = useAuthState()

  const navigate = useNavigate()

  const handleAuth = (type: 'login' | 'register') => {
    dispatch(openModal(type))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#121214' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <CasinoIcon sx={{ color: '#00b37e' }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {"Let's Play"}
          </Typography>
          {status === 'authenticated' ? (
            <>
              <Button color="inherit" sx={{ fontWeight: 'bold' }}>
                Hi {user.name},games here
              </Button>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => {
                  dispatch(logout())
                  navigate('/')
                  window.location.reload()
                }}
              >
                <ExitToAppIcon sx={{ color: '#fff' }} />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{ fontWeight: 'bold' }}
                onClick={() => handleAuth('login')}
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ fontWeight: 'bold' }}
                onClick={() => handleAuth('register')}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
