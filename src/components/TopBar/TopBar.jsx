import React, { useContext } from 'react'
import './topBar.css'
import { Chat, NotificationAdd, Person, Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
export default function TopBar() {
  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="topBar">
      <div className="topLeft">
        <Link to="/">
          <span className="logo">NOsAAD</span>
        </Link>
      </div>
      <div className="topCenter">
        <div className="searchBar">
          <Search />
          <input
            placeholder="Search for friends, post or video "
            className="searchInput"
          />
        </div>
      </div>
      <div className="topRight">
        <div className="topBarLinks">
          <span className="topBarLink">Homepage</span>
          <span className="topBarLink">Timeline</span>
        </div>
        <div className="topBarIconItem">
          <Person />
          <span className="topBarIconBadge">2</span>
        </div>
        <div className="topBarIconItem">
          <Chat />
          <span className="topBarIconBadge">2</span>
        </div>
        <div className="topBarIconItem">
          <NotificationAdd />
          <span className="topBarIconBadge">2</span>
        </div>
        <Link to={`profile/${user.username}`}>
          <img
            className="topBarImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + 'noProfile.png'
            }
            alt="person"
          />
        </Link>
      </div>
    </div>
  )
}
