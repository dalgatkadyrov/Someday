import React, { Children, useEffect, useState } from 'react'
import './MainPage.css'
import Card from '../../components/Card/Card'
import bookmark from '../../assets/icons/bookmark.png'
import search from '../../assets/icons/search.png'
import arrowdown from '../../assets/icons/arrowdown.png'
import route from '../../assets/icons/route.png'


const MainPage = ({ onLogout, setIsAdd, cards, setCards, currentPage, setCompleted, completed, currentCategory, onOpenMobileNav }) => {

  const [searchCards, setSearchCards] = useState()
  const [expanded, setExpanded] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const completedCount = cards.filter((card) => card.completed).length
  const progress = cards.length ? Math.round((completedCount / cards.length) * 100) : 0

  const url = '/api/cards/'

  function handleSearch(e) {

    setSearchCards(cards.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase())))

    !e.target.value && setSearchCards()

  }

  function handleSort(e) {
    const value = e.target.value3

    if (value === 'name') {
      setCards([...cards].sort((a, b) => a.title > b.title ? 1 : -1,))
    }
    if (value === 'category') {
      setCards([...cards].sort((a, b) => a.category > b.category ? 1 : -1,))
    }
    if (value === 'recentlyAdded') {
      setCards([...cards].sort((a, b) => b.sortByNum - a.sortByNum,))
    }

  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(url, {
          credentials: 'include'
        })

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
        <div className='brand-main'>
          <button className='mobileNavToggle-main' type='button' aria-label='Open navigation' onClick={onOpenMobileNav}><span></span><span></span><span></span></button>
          <img src={bookmark} alt="" /><p>YOUR PERSONAL COLLECTION</p>
        </div>
        <div className='userMenu-main'>
          <button className='userProf' type='button' aria-label='Open user menu' aria-expanded={userMenuOpen} onClick={() => setUserMenuOpen((open) => !open)}></button>
          {userMenuOpen && 
          <div className='userPopup-main'>
            <button type='button' onClick={()=>{setUserMenuOpen(false), onLogout()}}> Log out</button>
          </div>
          }
        </div>
      </div>

      <div className="search-main">
        <h1>Your life, your list.</h1>
        <p>Collect the things you want to experience someday.</p>
        <div className='searchHolder-main'>
          <label className='searchBar-main'><img src={search} alt="" /><input onChange={handleSearch} placeholder='Search your experiences...' type="text" /></label>
          <button onClick={() => setIsAdd(true)}>+ Add Experience</button>
        </div>
      </div>

      <div className='categories-main'>
        <div>
          <h4>{currentPage === 'allExperiences' ? 'All Experiences' : currentPage === 'completed' ? 'Completed' : currentPage === 'notStarted' ? 'Not Started' : currentCategory}</h4>
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
              currentPage === 'notStarted' ?
                searchCards ? searchCards.map((card, index) =>
                  card.completed === false && <Card key={index} card={card} cards={cards} setCards={setCards} />
                ) : expanded ? cards.map((card, index) =>
                  card.completed === false && <Card key={index} card={card} cards={cards} setCards={setCards} />) : cards.slice(0, 6).map((card, index) =>
                    card.completed === false && <Card key={index} card={card} cards={cards} setCards={setCards} />
                  ) :
                currentCategory === 'Adventure' ?
                  searchCards ? searchCards.map((card, index) =>
                    card.category === 'Adventure' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                  ) : cards.map((card, index) =>
                    card.category === 'Adventure' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                  ) :
                  currentCategory === 'Travel' ?
                    searchCards ? searchCards.map((card, index) =>
                      card.category === 'Travel' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                    ) : cards.map((card, index) =>
                      card.category === 'Travel' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                    ) :
                    currentCategory === 'Skills' ?
                      searchCards ? searchCards.map((card, index) =>
                        card.category === 'Skills' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                      ) : cards.map((card, index) =>
                        card.category === 'Skills' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                      ) :
                      currentCategory === 'Personal Growth' ?
                        searchCards ? searchCards.map((card, index) =>
                          card.category === 'Personal Growth' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                        ) : cards.map((card, index) =>
                          card.category === 'Personal Growth' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                        ) :
                        searchCards ? searchCards.map((card, index) =>
                          card.category === 'Other' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                        ) : cards.map((card, index) =>
                          card.category === 'Other' && <Card key={index} card={card} cards={cards} setCards={setCards} />
                        )

        }
      </section>

      <div className='experiencesAmount-main'>
        <p>{expanded ? cards.length : cards.slice(0, 6).length} of {cards.length} all experiences</p>
        <button style={{ display: searchCards || currentCategory ? 'none' : 'block' }} onClick={() => setExpanded(expanded ? false : true)} >{expanded ? 'Show Less' : 'Show more'} <img style={{ transform: expanded && 'rotateZ(180deg)' }} src={arrowdown} alt="" /></button>
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
          <p>{progress}%</p>
          <div className="progressBar" role='progressbar' aria-valuenow={progress} aria-valuemin='0' aria-valuemax='100'>
            <div className="progressBarFill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default MainPage
