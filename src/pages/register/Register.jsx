import axios from 'axios'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './register.css'

export default function Register() {
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const navigate = useNavigate()
  async function handleClick(e) {
    e.preventDefault()
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match!")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }

      try {
        await axios.post('/auth/register', user)
        navigate('/login')
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <span className="loginTitle">NOsAAD</span>
          <p className="loginDesc">
            Connect with friends and world around you where NO one is SAAD .
          </p>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              ref={username}
              placeholder="Username"
              required
              type="text"
              className="loginInput"
            />
            <input
              ref={email}
              required
              placeholder="Email"
              type="email"
              className="loginInput"
            />
            <input
              ref={password}
              required
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <input
              ref={passwordAgain}
              required
              placeholder="Password again"
              type="password"
              className="loginInput"
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <Link to="/login">
              <span className="loginForget">Already have registered</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
