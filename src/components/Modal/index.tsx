import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { closeModal, useGeneralState } from '../../store/general'
import { Box, Button, Grid, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { AuthModal, InputArea, ModalContent, ModalHeader } from './styles'
import { login, register, User } from '../../store/auth'
import { Warning } from '..'

type FormData = {
  username: string
  password: string
  confirmPassword: string
  birthDate: Date
}

type WarningState = {
  state: {
    open: boolean
    vertical: 'top' | 'bottom'
    horizontal: 'center' | 'right' | 'left'
    severity: 'error' | 'warning' | 'info' | 'success'
  }
  message: string
  handleClose: () => void
}

const initialState = {
  state: {
    open: false,
    vertical: 'top',
    horizontal: 'left',
    severity: 'error',
  },
  message: '',
  handleClose: () => {},
} as WarningState

export const Modal = () => {
  const dispatch = useDispatch()

  const formRef = useRef<HTMLFormElement>(null)
  const formData = useRef<FormData>({} as FormData)
  const [warning, setWarning] = useState<WarningState>({
    state: {
      open: false,
      vertical: 'top',
      horizontal: 'left',
      severity: 'error',
    },
    message: '',
    handleClose: () => {},
  } as WarningState)

  const {
    modal: { open, type },
  } = useGeneralState()

  const modalType = type === 'register'

  const handleCloseWarning = () => {
    setWarning(initialState)
  }

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    const username = formData.current.username
    const password = formData.current.password
    const confirmPassword = formData.current.confirmPassword
    const birthDate = formData.current.birthDate

    if (type === 'login') {
      if (username && checkString(password)) {
        const credentials = JSON.parse(
          localStorage.getItem('@casinoUser') as string,
        ) as User

        if (
          credentials.name === username &&
          credentials.password === password
        ) {
          dispatch(login({ name: username, password }))

          setWarning({
            state: {
              open: true,
              horizontal: 'left',
              vertical: 'top',
              severity: 'success',
            },
            message: 'Logged',
            handleClose: handleCloseWarning,
          })

          setTimeout(() => {
            dispatch(closeModal())
          }, 1000)
        }
      } else {
        setWarning({
          state: {
            open: true,
            horizontal: 'left',
            vertical: 'top',
            severity: 'error',
          },
          message: 'Invalid credentials',
          handleClose: handleCloseWarning,
        })
      }
    }

    if (type === 'register') {
      if (
        username &&
        checkString(password) &&
        checkString(confirmPassword) &&
        password === confirmPassword &&
        isOver18(new Date(birthDate))
      ) {
        dispatch(register({ name: username, password, birthDate }))

        setWarning({
          state: {
            open: true,
            horizontal: 'left',
            vertical: 'top',
            severity: 'success',
          },
          message: 'Sucessifully registerd',
          handleClose: handleCloseWarning,
        })
        setTimeout(() => {
          dispatch(closeModal())
        }, 1000)
      } else {
        setWarning({
          state: {
            open: true,
            horizontal: 'left',
            vertical: 'top',
            severity: 'error',
          },
          message:
            'Passwords must be equal with 5 digits, at least 1 letter, 1 number and 1 special character. Birthdate must be at least 18',
          handleClose: handleCloseWarning,
        })
      }
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value

    formData.current = {
      ...formData.current,
      [name]: value,
    }
  }

  const renderContent = () => {
    return (
      <Box component="form" onSubmit={handleFormSubmit} ref={formRef}>
        <Grid container spacing={3} sx={{ marginTop: '2rem' }}>
          <Grid item xs={modalType ? 6 : 12}>
            <InputArea>
              <TextField
                required
                name="username"
                label="username"
                onChange={handleInputChange}
                fullWidth
                inputRef={formData}
                InputProps={{
                  sx: {
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#00b37e !important',
                    },
                  },
                }}
              />
            </InputArea>
          </Grid>
          <Grid item xs={modalType ? 6 : 12}>
            <InputArea>
              <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                required
                onChange={handleInputChange}
                inputRef={formData}
                InputProps={{
                  sx: {
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#00b37e !important',
                    },
                  },
                }}
              />
            </InputArea>
          </Grid>

          {modalType && (
            <>
              <Grid item xs={6}>
                <InputArea>
                  <TextField
                    label="Repeat Password  "
                    type="password"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    fullWidth
                    required
                    inputRef={formData}
                    InputProps={{
                      sx: {
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00b37e !important',
                        },
                      },
                    }}
                  />
                </InputArea>
              </Grid>
              <Grid item xs={6}>
                <InputArea>
                  <TextField
                    label="Birthdate"
                    type="date"
                    name="birthDate"
                    fullWidth
                    onChange={handleInputChange}
                    required
                    inputRef={formData}
                    InputLabelProps={{ shrink: true, required: true }}
                    InputProps={{
                      sx: {
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: '#00b37e !important',
                        },
                      },
                    }}
                  />
                </InputArea>
              </Grid>
            </>
          )}
        </Grid>
        <Button
          variant="contained"
          sx={{
            marginTop: '2rem',
            background: '#00b37e',
            '&:hover': {
              background: 'white',
              color: '#00b37e',
            },
          }}
          type="submit"
        >
          {type.toUpperCase()}
        </Button>
        <Warning
          state={warning?.state}
          message={warning?.message}
          handleClose={warning?.handleClose}
        />
      </Box>
    )
  }

  return (
    <AuthModal open={open} onClose={() => dispatch(closeModal())}>
      <ModalContent>
        <ModalHeader>
          <div></div>
          <IconButton
            sx={{ color: '#00b37e' }}
            onClick={() => dispatch(closeModal())}
          >
            <CloseIcon />
          </IconButton>
        </ModalHeader>

        {renderContent()}
      </ModalContent>
    </AuthModal>
  )
}

function isOver18(dateOfBirth: Date) {
  // Calculate today's date
  const today = new Date()

  // Calculate the person's age
  let age = today.getFullYear() - dateOfBirth.getFullYear()

  // Adjust the age if necessary (accounting for leap years)
  const monthDiff = today.getMonth() - dateOfBirth.getMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
    age--
  }

  // Check if the person is 18 or older
  return age >= 18
}

function checkString(str: string): boolean {
  // Check if the string is exactly 5 characters long
  if (str.length !== 5) {
    return false
  }

  // Check if the string contains at least one number
  const containsNumber = /[0-9]/.test(str)
  if (!containsNumber) {
    return false
  }

  // Check if the string contains at least one special character
  const containsSpecialChar = /[^a-zA-Z0-9]/.test(str)
  if (!containsSpecialChar) {
    return false
  }

  // Check if the string contains at least one letter
  const containsLetter = /[a-zA-Z]/.test(str)
  if (!containsLetter) {
    return false
  }

  // If all conditions are met, return true
  return true
}
