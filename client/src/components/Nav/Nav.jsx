import React from 'react'
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



const Nav = ({ setCurrentPage, currentPage, cards }) => {
    return (
        <div className='nav-nav'>
            <div className='topCont'>
                <div className='nav-titleHolder'>
                    <img src={sunriseIco} alt="" />
                    <h1>Someday</h1>
                    <p>A life beyond the everyday.</p>
                </div>

                <div className="nav-pageButtons">
                    <button onClick={() => setCurrentPage('allExperiences')}><img src={allExperience} alt="" />All Experience<p>{cards.length}</p></button>
                    <button onClick={() => setCurrentPage('notStarted')}><img src={notStarted} alt="" />Not Started<p>{cards.filter((card)=>!card.completed).length}</p></button>
                    <button onClick={() => setCurrentPage('completed')}><img src={completed} alt="" />Completed<p>{cards.filter((card)=>card.completed).length}</p></button>
                </div>

                <div className="nav-categories">
                    <p>CATEGORIES</p>
                    <button><img src={adventure} alt="" />Adventure <p>7</p></button>
                    <button><img src={travel} alt="" />Travel <p>8</p></button>
                    <button><img src={skills} alt="" />Skills <p>4</p></button>
                    <button><img src={personal} alt="" />Personal Growth <p>3</p></button>
                    <button><img src={other} alt="" />Other <p>2</p></button>
                </div>
            </div>
            <div className='bottomCont'>
                <div className='nav-statusBar'>
                    <img src={flag} alt="" />
                    <p>12.5%</p>
                    <hr />
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