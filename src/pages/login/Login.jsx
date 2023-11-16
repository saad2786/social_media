import { useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCall'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Login() {
  const email = useRef()
  const password = useRef()
  const { user, isFetching, error, dispatch } = useContext(AuthContext)
  function handleClick(e) {
    e.preventDefault()
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,
    )
    console.log(user)
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
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              ref={password}
              required
              autoComplete="on"
              minLength={6}
              type="password"
              className="loginInput"
            />
            <button type="submit" className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                'Login'
              )}
            </button>
            <span className="loginForget">Forgot password?</span>
            <Link to="/register">
              <button className="registerButton">
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  'Create a New Account'
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
