import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'
const INITIAL_STATE = {
  user: {
    _id: { $oid: '6513b37cab9a6b04eeebc280' },
    username: 'saad',
    email: 'saad@gmail.com',
    password: '$2b$10$6CmZ4Xi75xNz/Beh1LmpVOPHrS/UkatOGdjpXTnH7W7Ztqoi9nmG6',
    profilePicture: 'person/3.jpg',
    coverPicture: '',
    followers: [],
    followings: [
      '6518258da36cd30432b7ff18',
      '65185c188adb3cb5c897d49d',
      '651cd7565dcbc23ec63cf46d',
    ],
    isAdmin: false,
    createdAt: { $date: { $numberLong: '1695789948878' } },
    updatedAt: { $date: { $numberLong: '1696383116505' } },
    __v: { $numberInt: '0' },
    desc: "hey i'm here",
    city: 'Bangluru',
    from: 'Miraj',
    relationship: { $numberInt: '1' },
  },
  isFetching: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
