import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
export async function loginCall(userCredential, dispatch) {
  try {
    dispatch({ type: 'LOGIN_START' })
    const res = await axios.post('auth/login', userCredential)
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err })
  }
}
