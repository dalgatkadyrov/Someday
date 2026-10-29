import './App.css'
import Nav from './components/Nav/Nav'
import MainPage from './pages/MainPage/MainPage'
import Add from './components/Add/Add'
import Auth from './pages/auth/Auth'
import { useEffect, useState } from 'react'

function App() {

  const [isAdd, setIsAdd] = useState(false)
  const [cards, setCards] = useState([])
  const [currentPage, setCurrentPage] = useState('allExperiences')
  const [currentCategory, setCurrentCategory] = useState()
  const [authed, setAuthed] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Could not log out')
      }

      setCards([])
      setIsAdd(false)
      setAuthed(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetch('/api/auth/me', {
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) setAuthed(true)
      })
      .catch(console.error)
      .finally(() => setAuthLoading(false))
  }, [])

  if (authLoading) return <div>Loading...</div>

  return (
    <div className='app-app'>
      {authed ? <>
        <div className="nav-app">
          <Nav setCurrentPage={setCurrentPage} currentPage={currentPage} cards={cards} setCurrentCategory={setCurrentCategory} currentCategory={currentCategory} />
        </div>
        <section className='main-app'>
          <MainPage onLogout={handleLogout} setIsAdd={setIsAdd} cards={cards} setCards={setCards} currentPage={currentPage} currentCategory={currentCategory} />
        </section>
        {isAdd && <Add setIsAdd={setIsAdd} setCards={setCards} cards={cards} />}
      </> :
        <Auth setAuthed={setAuthed} />}

    </div>
  )
}

export default App
