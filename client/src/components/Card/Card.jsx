import React, { useEffect, useState } from 'react'
import './Card.css'
// import skydive from '../../assets/images/skydive.png'
import tripledot from '../../assets/icons/tripledot.png'

const Card = ({ card, cards, setCards, setIsCompleted, isCompleted }) => {

  const [isDelete, setIsDelete] = useState(false)

  const url = '/api/cards/'



  const handleUpdate = async () => {

    const newCompleted = !card.completed

    try {
      const response = await fetch(url + card._id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          completed: newCompleted
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error)
      }

      setCards((prev) => prev.map((el) => el._id === result._id ? result : el))

    } catch (error) {
      console.error(error.message)
    }

    console.log(cards)

  }

  const handleDelete = async () => {
    try {
      const response = await fetch(url + card._id, {
        method: 'DELETE',
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) { throw new Error(result.error) }

      // setCards(cards.filter(i => i !== card))
      setCards((prev) => prev.filter((el) => el._id !== card._id))

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='card-card' onClick={() => setIsDelete(false)}>
      <div className='imgPart-card' >
        <p>{card.category}</p>
        {!isDelete ? <button onClick={(e) => { e.stopPropagation(); setIsDelete(true) }}><img src={tripledot} alt="" /></button> : <button style={{ color: 'white', padding: '5px 10px' }} onClick={handleDelete}>Delete</button>}
        {card.image && <img src={card.image} alt="" />}
      </div>
      <div className='infoPart-card' onClick={() => setIsDelete(false)}>
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <label><input checked={card.completed} onChange={handleUpdate} type="checkbox" />{card.completed ? 'Completed' : 'Want to Try'}</label>

      </div>
    </div>
  )
}

export default Card
