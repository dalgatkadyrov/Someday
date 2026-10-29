import React from 'react'
import './Add.css'
import star from '../../assets/icons/star.png'
import x from '../../assets/icons/x.png'
import picture from '../../assets/icons/picture.png'
import padlock from '../../assets/icons/padlock.png'

const Add = ({ setIsAdd, setCards, cards }) => {

    const url = '/api/cards/'


    const handleSubmit = async (e) => {
        e.preventDefault()

        // setCards(prev => [...prev, {
        //     title: e.target.title.value,
        //     description: e.target.description.value,
        //     category: e.target.category.value,
        //     image: e.target.image.files[0],
        //     sortByNum: cards.length + 1,
        //     completed: false
        // }])

        const card = {
            title: e.target.title.value,
            description: e.target.description.value,
            category: e.target.category.value,
            image: e.target.image.files[0],
            sortByNum: cards.length + 1,
            completed: false

        }

        const formData = new FormData()
        formData.append('title', card.title)
        formData.append('description', card.description)
        formData.append('category', card.category)
        card.image && formData.append('image', card.image)
        formData.append('sortByNum', card.sortByNum)
        formData.append('completed', card.completed)





        try {
            console.log(card)

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })

            const result = await response.json()


            if (!response.ok) {
                throw new Error(result.error)
            }
            setCards(prev => [...prev, result])
            // setCards(prev => result)


        } catch (error) {
            console.log(error)
        }

        setIsAdd(false)

    }


    return (
        <div className='add-add'>
            <form onSubmit={handleSubmit} className='add-form'>
                <div className='firstPart-form'>
                    <div><img src={star} alt="" /><button onClick={() => setIsAdd(false)}><img src={x} alt="" /></button></div>
                    <h2>Add Experience</h2>
                    <p>Big adventure or small firs. Make room for it here.</p>
                </div>
                <div className='mainPart-form'>
                    <label htmlFor="">Title<input required name='title' type="text" placeholder='What do you want to experience?' /></label>
                    <label htmlFor="">Description <span>Optional</span> <textarea name="description" id="" placeholder='The why, the where, or a little inspiration...'></textarea></label>
                    <label htmlFor="">
                        Category
                        <select name="category" id="" required>
                            <option value="">Select a category</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Travel">Travel</option>
                            <option value="Skills">Skills</option>
                            <option value="Personal Growth">Personal Growth</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <div>
                        Cover image <span>Optional</span>
                        <label htmlFor="addFile-add">
                            <input name='image' type="file" id='addFile-add' accept='image/*'></input>
                            <img src={picture} alt="" />
                            <span style={{ color: '#C4F36B' }}>Click to upload <span>or drag and drop</span></span>
                            <span>JPG or PNG Up to 5 MB</span>
                        </label>
                    </div>
                </div>

                <div className='lastPart-form'>
                    <div><img src={padlock} alt="" /><p>Only visible to you</p></div>
                    <div><button type='button' onClick={() => setIsAdd(false)}>Cancel</button><button type='submit'>Save Experience</button></div>
                </div>
            </form>
        </div>
    )
}

export default Add