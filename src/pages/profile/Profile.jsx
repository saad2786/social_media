import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Feed from '../../components/Feed/Feed'
import RightBar from '../../components/RightBar/RightBar'
import SideBar from '../../components/SideBar/SideBar'
import TopBar from '../../components/TopBar/TopBar'
import { useParams } from 'react-router'
import './profile.css'
import { AuthContext } from '../../context/AuthContext'

export default function Profile() {
  const [user, setUser] = useState({})
  const { user: currentUser } = useContext(AuthContext)
  const username = useParams().username

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  useEffect(
    function () {
      async function fetchPosts() {
        const res = await axios.get(`/users?username=${username}`)
        setUser(res.data)
      }
      fetchPosts()
    },
    [username],
  )
  return (
    <>
      <TopBar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture || PF + 'noCover.jpg'}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={PF + user.profilePicture || PF + 'noProfile.png'}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoUsername">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
