import React, { Children, useEffect, useState } from 'react'
import './MainPage.css'
import Card from '../../components/Card/Card'
import bookmark from '../../assets/icons/bookmark.png'
import search from '../../assets/icons/search.png'
import arrowdown from '../../assets/icons/arrowdown.png'
import route from '../../assets/icons/route.png'


const MainPage = ({ setIsAdd, cards, setCards, currentPage, setCompleted, completed }) => {

  const [searchCards, setSearchCards] = useState()
  const [expanded, setExpanded] = useState(false)

  const [isCompleted, setIsCompleted] = useState(false)

  const url = 'http://localhost:3500/api/cards/'

  function handleSearch(e) {

    setSearchCards(cards.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase())))

    !e.target.value && setSearchCards()

  }

  function handleSort(e) {
    const value = e.target.value

    if (value === 'name') {
      setCards([...cards].sort((a, b) => a.title > b.title ? 1 : -1,))
    }
    if (value === 'category') {
      setCards([...cards].sort((a, b) => a.category > b.category ? 1 : -1,))
    }
    if (value === 'recentlyAdded') {
      setCards([...cards].sort((a, b) => a.sortByNum - b.sortByNum,))
    }

  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(url)

        if (!response.ok) { throw new Error('failed to fetch') }

        const result = await response.json()

        // setCards(result)
        setCards(result)


      } catch (error) {
        console.error(error.message)
      }
    }

    fetchMessages()

  }, [setCards])

  return (
    <div className='mainPage' >
      <div className='userBar-main'>
        <div><img src={bookmark} alt="" /><p>YOUR PERSONAL COLLECTION</p></div>
        <div className='userProf'></div>
      </div>

      <div className="search-main">
        <h1>Your life, your list.</h1>
        <p>Collect the things you want to experience someday.</p>
        <div className='searchHolder-main'>
          <label htmlFor="" className='searchBar-main'><img src={search} alt="" /><input onChange={handleSearch} placeholder='Search your experiences...' type="text" /></label>
          <button onClick={() => setIsAdd(true)}>+ Add Experience</button>
        </div>
      </div>

      <div className='categories-main'>
        <div>
          <h4>{currentPage === 'allExperiences' ? 'All Experiences' : currentPage === 'completed' ? 'Completed' : 'Not Started'}</h4>
          <p>{cards.length}</p>
        </div>

        <div>
          <select name="Recently added" id="" onChange={handleSort}>
            <option value="recentlyAdded">Recently added</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
          </select>
        </div>
        <hr />

      </div>

      {/* <section className='cardHolder-main'>
        {
          currentPage === 'allExperiences' ?
            searchCards ? searchCards.map((card, index) =>
              <Card key={index} card={card} cards={cards} setCards={setCards} />
            ) : cards.map((card, index) =>
              <Card key={index} card={card} cards={cards} setCards={setCards} />
            ) :
            currentPage === 'completed' ?
              searchCards ? searchCards.map((card, index) =>
                card.completed === true && <Card key={index} card={card} cards={cards} setCards={setCards} />
              ) : cards.map((card, index) =>
                card.completed === true && <Card key={index} card={card} cards={cards} setCards={setCards} />
              ) :
              searchCards ? searchCards.map((card, index) =>
                card.completed === false && <Card key={index} card={card} cards={cards} setCards={setCards} />
              ) : cards.map((card, index) =>
                card.completed === false && <Card key={index} card={card} cards={cards} setCards={setCards} />
              )
        }
      </section> */}
      <section className='cardHolder-main'>
        {
          currentPage === 'allExperiences' ?
            searchCards ? searchCards.map((card, index) =>
              <Card key={index} card={card} cards={cards} setCards={setCards} />
            ) : expanded ? cards.map((card, index) =>
              <Card key={index} card={card} cards={cards} setCards={setCards} />) :
              cards.slice(0, 6).map((card, index) =>
                <Card key={index} card={card} cards={cards} setCards={setCards} />
              ) :
            currentPage === 'completed' ?
              searchCards ? searchCards.map((card, index) =>
                card.completed === true && <Card key={index} card={card} cards={cards} setCards={setCards} />
              ) : expanded ? cards.map((card, index) =>
                card.completed === true && <Card key={index} card={card} cards={cards} setCards={setCards} />) : cards.slice(0, 6).map((card, index) =>
                  card.completed === true && <Card key={index} card={card} cards={cards} setCards={setCards} />
                ) :
              searchCards ? searchCards.map((card, index) =>
                card.completed === false && <Card key={index} card={card} cards={cards} setCards={setCards} />
              ) : expanded ? cards.map((card, index) =>
                card.completed === false && <Card key={index} card={card} cards={cards} setCards={setCards} />) : cards.slice(0, 6).map((card, index) =>
                  card.completed === false && <Card key={index} card={card} cards={cards} setCards={setCards} />
                )
        }
      </section>

      <div className='experiencesAmount-main'>
        <p>6 of {cards.length} experiences</p>
        <button style={{ display: searchCards ? 'none' : 'block' }} onClick={() => setExpanded(expanded ? false : true)} >{expanded ? 'Show Less' : 'Show more'} <img style={{ transform: expanded && 'rotateZ(180deg)' }} src={arrowdown} alt="" /></button>
      </div>

      <div className='journey'>

        <div>
          <img src={route} alt="" />
          <div>
            <h4>Your journey</h4>
            <p>{cards.filter((item) => item.completed).length} of {cards.length} experiences completed.</p>
          </div>
        </div>

        <div>
          <p>A little closer to a life well lived.</p>
          <p>12.5%</p>
          <hr />
        </div>
      </div>


    </div>
  )
}

export default MainPage