import { Route, Routes } from 'react-router-dom'
import { AuthenticatedRoute, Navbar } from './components'
import { Modal } from './components/Modal'
import { Game } from './pages/Game'
import { GamesLibrary } from './pages/GamesLibrary'
import { Home } from './pages/Home'

function App() {
  return (
    <AuthenticatedRoute>
      <Navbar />
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GamesLibrary />} />
        <Route path="/games/:name" element={<Game />} />
      </Routes>
      {/* </Router> */}
      <Modal />
    </AuthenticatedRoute>
  )
}

export default App
