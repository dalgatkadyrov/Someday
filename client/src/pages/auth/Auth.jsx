import React, { useState } from 'react'
import './Auth.css'
import sunrise from '../../assets/icons/sunrise.png'
import padlock from '../../assets/icons/padlock.png'
import preview from '../../assets/images/preview.png'
import arrowRight from '../../assets/icons/arrow-right.png'


const Auth = ({ setAuthed }) => {

    const [regState, setRegState] = useState('login')
    const [error, setError] = useState()
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            if (regState === 'reg') {
                const password2 = formData.get('password2')

                if (password !== password2) {
                    setError('Passwords do not match')
                    return
                }

                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: formData.get('name'),
                        email,
                        password
                    })
                })

                const result = await response.json()

                if (!response.ok) {
                    throw new Error(result.error)
                }

                setRegState('login')
                setMessage('Account create. You can now log in.')
                return
            }
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password, keepLogin: formData.get('keepLogin') === 'on' })
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error)

            }

            setAuthed(true)

        }
        catch (error) {
            setError(error.message)
        }

    }

    return (
        <div className='auth'>

            <div className='auth-auth'>
                <div className='loginLeft-auth'>
                    <div className='heading-auth'><img src={sunrise} alt="" /><h1>Someday</h1><p>A life beyond the everyday.</p></div>

                    <div className='middleInfo-auth'>
                        <p>YOUR PERSONAL COLLECTION</p>
                        <h1>A little closer to a life well lived.</h1>
                        <p>Collect the things you want to experience someday. Make room for what matters to you.</p>
                        <div className='photoCard-auth'>
                            <div>
                                <p>Travel</p>
                                <img src={preview} alt="" />
                            </div>
                            <div>
                                <h3>See the Northern Lights</h3>
                                <p>Find a quiet corner of the world and watch the sky come alive.</p>
                                <label htmlFor=""><input type="checkbox" />Want to Try</label>
                            </div>
                        </div>
                    </div>

                    <div className='secureNotice-auth'>
                        <img src={padlock} alt="" />
                        <p>Just for you. Always.</p>
                    </div>
                </div>

                {regState === 'login' ? <div className='loginRight-auth'>
                    <div className='regSwitch-auth'><p>New to Someday?</p><button onClick={() => setRegState('reg')}>Create an account</button><img src={arrowRight} alt="" /></div>

                    <form onSubmit={handleSubmit} className='loginForm-auth'>
                        <div>
                            <p>ONE SOMEDAY AT A TIME</p>
                            <h1>Welcome back.</h1>
                            <p>Your next experience is waiting. Log in to your personal collection.</p>
                            {message && <p style={{ color: 'darkred' }}>{message}</p>}
                            {error && <p style={{ color: 'darkred' }}>{error}</p>}
                        </div>
                        <div>
                            <label className='typingInfo-auth' htmlFor="">Email address <input placeholder='Type email address' name='email' type="email" required /></label>
                            <label className='typingInfo-auth' htmlFor="">Password <input placeholder='Type password' name='password' type="password" required /></label>
                            <label className='checkbox-auth' htmlFor=""><input name='keepLogin' type="checkbox" />Keep me logged in</label>
                            <button type='submit'>Log in</button>
                            <p>A whole world of somedays ahead.</p>
                            <hr />
                            <div><img src={padlock} alt="" /><p>Your list is private. Your journey is yours.</p></div>
                        </div>
                    </form>


                    <div>
                        <p>© 2026 Someday</p>
                        <div><button>Privacy</button> <button>Terms</button></div>
                    </div>

                </div>
                    :
                    <div className='loginRight-auth'>
                        <div className='regSwitch-auth'><p>Already have an account?</p><button onClick={() => setRegState('login')}>Log in</button><img src={arrowRight} alt="" /></div>

                        <form onSubmit={handleSubmit} className='loginForm-auth'>
                            <div>
                                <p>MAKE SPACE FOR SOMEDAY</p>
                                <h1>Your life, your list.</h1>
                                <p>Create an account to start collection the experiences you want to make real.</p>

                            </div>
                            <div>
                                <label className='typingInfo-auth' htmlFor="">Full name<input name='name' placeholder='Your full name' type="text" required /></label>
                                <label className='typingInfo-auth' htmlFor="">Email address <input name='email' placeholder='you@example.com' type="email" required /></label>
                                <label className='typingInfo-auth' htmlFor="">Password <input name='password' placeholder='Create a password' type="password" required /></label>
                                <p style={{ textAlign: 'left', marginBottom: '20px' }}>At least 8 characters</p>
                                <label className='typingInfo-auth' htmlFor="">Confirm password <input name='password2' placeholder='Enter your password again' type="password" required /></label>
                                {error && <p>{error}</p>}
                                {/* <label className='checkbox-auth' htmlFor=""><input type="checkbox" />I agree to the Terms and Privacy Policy</label> */}
                                <button type='submit'>Create account</button>
                                {/* <p>We'll email you link to verify your account. Your personal collection starts there.</p> */}

                            </div>
                        </form>


                        <div>
                            <p>© 2026 Someday</p>
                            <div><button>Privacy</button> <button>Terms</button></div>
                        </div>

                    </div>

                }
            </div>

        </div>
    )
}

export default Auth
