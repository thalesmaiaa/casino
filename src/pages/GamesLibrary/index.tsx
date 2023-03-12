import { useCallback, useRef } from 'react'

import { Search } from '@mui/icons-material'
import { Box, InputAdornment } from '@mui/material'

import { Container, GamesContainer } from '../../components'
import { WhiteBorderTextField } from './styles'
import { useDispatch } from 'react-redux'
import { getGames, useGamesState } from '../../store/games'

export const GamesLibrary = () => {
  const gameRef = useRef<HTMLInputElement | null>(null)

  const { reduced } = useGamesState()

  const dispatch = useDispatch()

  const handleGameSearch = useCallback(() => {
    dispatch(
      getGames({
        searchParam: gameRef.current?.value,
        size: reduced ? 'reduced' : 'all',
      }),
    )
  }, [dispatch, gameRef, reduced])

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          minWidth: '1100px',
        }}
      >
        <WhiteBorderTextField
          variant="standard"
          fullWidth
          name="game"
          inputRef={gameRef}
          onChange={handleGameSearch}
          InputProps={{
            sx: { color: '#fff' },
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#00be7e' }} />
              </InputAdornment>
            ),
          }}
        />
        <GamesContainer page="games" />
      </Box>
    </Container>
  )
}
