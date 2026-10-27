import './App.css'
import Nav from './components/Nav/Nav'
import MainPage from './pages/MainPage/MainPage'
import Add from './components/Add/Add'
import { useEffect, useState } from 'react'

function App() {

  const [isAdd, setIsAdd] = useState(false)
  const [cards, setCards] = useState([])
  const [currentPage, setCurrentPage] = useState('allExperiences')


  useEffect(() => {
    console.log(currentPage)
  }, [currentPage])

  return (
    <div className='app-app'>
      <div className="nav-app">
        <Nav setCurrentPage={setCurrentPage} currentPage={currentPage} cards={cards} />
      </div>
      <section className='main-app'>
        <MainPage setIsAdd={setIsAdd} cards={cards} setCards={setCards} currentPage={currentPage}/>
      </section>
      {isAdd && <Add setIsAdd={setIsAdd} setCards={setCards} cards={cards} />}
    </div>
  )
}

export default App
