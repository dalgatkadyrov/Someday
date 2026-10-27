import React, { useEffect, useState } from 'react'
import './Card.css'
// import skydive from '../../assets/images/skydive.png'
import tripledot from '../../assets/icons/tripledot.png'

const Card = ({ card, cards, setCards, setIsCompleted, isCompleted }) => {

  const [isDelete, setIsDelete] = useState(false)

  const url = 'http://localhost:3500/api/cards/'


  const handleUpdate = async () => {

    if (card.completed === false)
      card.completed = true
    else if (card.completed === true)
      card.completed = false

    try {
      const response = await fetch(url + card._id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: card.completed
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
        method: 'DELETE'
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
    <div className='card-card' >
      <div className='imgPart-card' >
        <p>{card.category}</p>
        {!isDelete ? <button onClick={() => setIsDelete(true)}><img src={tripledot} alt="" /></button> : <button style={{ color: 'white', padding: '5px 10px' }} onClick={handleDelete}>Delete</button>}
        {card.image && <img src={URL.createObjectURL(card.image)} alt="" />}
      </div>
      <div className='infoPart-card' onClick={() => setIsDelete(false)}>
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <label><input defaultChecked={card.completed} onChange={handleUpdate} type="checkbox" />{card.completed ? 'Completed' : 'Want to Try'}</label>

      </div>
    </div>
  )
}

export default Card
