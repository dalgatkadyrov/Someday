import React, { useState } from 'react'
import './Nav.css'
import sunriseIco from '../../assets/icons/sunrise.png'
import allExperience from '../../assets/icons/allExperience.png'
import notStarted from '../../assets/icons/notStarted.png'
import completed from '../../assets/icons/completed.png'
import adventure from '../../assets/icons/adventure.png'
import travel from '../../assets/icons/travel.png'
import skills from '../../assets/icons/skills.png'
import personal from '../../assets/icons/personal.png'
import other from '../../assets/icons/other.png'
import flag from '../../assets/icons/flag.png'
import padlock from '../../assets/icons/padlock.png'



const Nav = ({ setCurrentPage, currentPage, cards, setCurrentCategory, currentCategory }) => {

    const completedCount = cards.filter((card) => card.completed).length
    const progress = cards.length ? Math.round((completedCount / cards.length) * 100) : 0

    return (
        <div className='nav-nav'>
            <div className='topCont'>
                <div className='nav-titleHolder'>
                    <img src={sunriseIco} alt="" />
                    <h1>Someday</h1>
                    <p>A life beyond the everyday.</p>
                </div>
                <div className="nav-pageButtons">
                    <button className={currentPage === 'allExperiences' ? 'selected' : 'navPageButton'} onClick={() => { setCurrentPage('allExperiences'); setCurrentCategory('') }}><img src={allExperience} alt="" />All Experience<p>{cards.length}</p></button>
                    <button className={currentPage === 'notStarted' ? 'selected' : 'navPageButton'} onClick={() => { setCurrentPage('notStarted'); setCurrentCategory('') }}><img src={notStarted} alt="" />Not Started<p>{cards.filter((card) => !card.completed).length}</p></button>
                    <button className={currentPage === 'completed' ? 'selected' : 'navPageButton'} onClick={() => { setCurrentPage('completed'); setCurrentCategory('') }}><img src={completed} alt="" />Completed<p>{cards.filter((card) => card.completed).length}</p></button>
                </div>

                <div className="nav-categories">
                    <p>CATEGORIES</p>
                    <button className={currentCategory === 'Adventure' ? 'selected' : 'navPageButton'} onClick={() => { setCurrentCategory('Adventure'); setCurrentPage('') }}><img src={adventure} alt="" />Adventure <p>{cards.filter((card) => card.category === 'Adventure').length}</p></button>
                    <button className={currentCategory === 'Travel' ? 'selected' : 'navPageButton'} onClick={() => { setCurrentCategory('Travel'); setCurrentPage('') }}><img src={travel} alt="" />Travel <p>{cards.filter((card) => card.category === 'Travel').length}</p></button>
                    <button className={currentCategory === 'Skills' ? 'selected' : 'navPageButton'} onClick={() => { setCurrentCategory('Skills'); setCurrentPage('') }}><img src={skills} alt="" />Skills <p>{cards.filter((card) => card.category === 'Skills').length}</p></button>
                    <button className={currentCategory === 'Personal Growth' ? 'selected' : 'navPageButton'} onClick={() => { setCurrentCategory('Personal Growth'); setCurrentPage('') }}><img src={personal} alt="" />Personal Growth <p>{cards.filter((card) => card.category === 'Personal Growth').length}</p></button>
                    <button className={currentCategory === 'Other' ? 'selected' : 'navPageButton'} onClick={() => { setCurrentCategory('Other'); setCurrentPage('') }}><img src={other} alt="" />Other <p>{cards.filter((card) => card.category === 'Other').length}</p></button>
                </div>
            </div>
            <div className='bottomCont'>
                <div className='nav-statusBar'>
                    <img src={flag} alt="" />
                    <p>{progress}%</p>
                    <div className="progressBar" role='progressbar' aria-valuenow={progress} aria-valuemin='0' aria-valuemax='100'>
                        <div className="progressBarFill" style={{ width: `${progress}%` }}></div>
                    </div>

                    {/* styles bar in nav.css */}

                    <p style={{ color: '#F2F1ED' }}>{cards.filter((item) => item.completed).length} of {cards.length} experienced</p>
                    <p>One someday at a time</p>
                </div>

                <hr />

                <div className='nav-securityWarn'>
                    <img src={padlock} alt="" />
                    <p>Just for you. Always.</p>
                </div>
            </div>
        </div>
    )
}

export default Nav
