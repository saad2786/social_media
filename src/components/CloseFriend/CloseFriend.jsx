import React from 'react'

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <>
      <li className="sideBarFriend">
        <img
          src={PF + user.profilePicture}
          alt="friend"
          className="sideBarFriendImg"
        />
        <span className="SideBarFriendText">{user.username}</span>
      </li>
    </>
  )
}
