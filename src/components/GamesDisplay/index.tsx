import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getGames, icons, useGamesState } from '../../store/games'
import { renderComponent } from '../../utils'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { Game as GameAvatar, GameArea, GamesContainer } from './styles'
import { useNavigate } from 'react-router-dom'

type Props = {
  page: 'landing' | 'games'
  routeTo?: string
}

interface Game {
  name: string
  icon: string
  background: string
  color: string
  url: string
}

const GamesDisplay = ({ page = 'games', routeTo = '' }: Props) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { games, reduced } = useGamesState()

  useEffect(() => {
    dispatch(getGames({ searchParam: null, size: 'reduced' }))
  }, [dispatch])

  if (!games) {
    return <CircularProgress />
  }

  const popularGames = Object.fromEntries(Object.entries(games).slice(0, 4))

  const handleNavigate = (path?: string, game?: Game) =>
    navigate(page === 'landing' ? routeTo : `/games/${path}`, {
      state: { game },
    })

  return (
    <GamesContainer sx={{ padding: '3rem 0rem' }} minWidth="750px">
      <Grid container spacing={12}>
        {Object.keys(page === 'games' ? games : popularGames).map((game) => (
          <Grid item xs={3} key={game} sx={{ marginBottom: '15px' }}>
            <GameArea>
              <GameAvatar
                key={game}
                background={games[game].background}
                onClick={() => handleNavigate(game, games[game])}
              >
                {renderComponent(icons[games[game].icon], {
                  color: games[game].color,
                })}
              </GameAvatar>
              <Typography
                component="span"
                sx={{
                  '&:hover': {
                    opacity: 0.7,
                    cursor: 'pointer',
                  },
                }}
              >
                {games[game].name}
              </Typography>
            </GameArea>
          </Grid>
        ))}
      </Grid>

      {page === 'games' && (
        <Typography
          variant="h6"
          onClick={() => {
            dispatch(
              getGames({
                searchParam: null,
                size: reduced ? 'all' : 'reduced',
              }),
            )
          }}
        >
          {reduced ? 'Show More' : 'Show Less'}
        </Typography>
      )}
    </GamesContainer>
  )
}

export default GamesDisplay
