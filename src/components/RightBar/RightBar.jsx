import './rightBar.css'

import Online from '../Online/Online'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Users } from '../../dummyData'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@mui/icons-material'
export default function RightBar({ user }) {
  const [friends, setFriends] = useState([])
  const { user: currentUser, dispatch } = useContext(AuthContext)
  const [isFollow, setIsFollow] = useState(false)

  // Check you foollowed or not
  useEffect(() => {
    async function checkFollower() {
      ;(await currentUser.followings.includes(user?._id))
        ? setIsFollow(true)
        : setIsFollow(false)
    }
    checkFollower()
  }, [currentUser, user])
  // Fetch friends
  useEffect(() => {
    async function fetchFriends() {
      try {
        const friendId = user._id
        const friendList = await axios.get(`/users/friends/${friendId}`)
        setFriends(friendList.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchFriends()
  }, [user])

  async function handleClick() {
    try {
      if (isFollow) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id.$oid,
        })
        dispatch({ type: 'UNFOLLOW', payload: user._id })
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id.$oid,
        })
        dispatch({ type: 'FOLLOW', payload: user._id })
      }
      setIsFollow(!isFollow)
    } catch (err) {
      console.log(err)
    }
  }
  function HomeRightBar() {
    return (
      <>
        <div className="rightBarBirthDay">
          <img
            src="assets/gift.png"
            alt="gift"
            className="rightBarBirthdayIcon"
          />
          <span className="spanrightBarText">
            <b>Khamzat Chimaive</b> and <b>3 other people</b> have a bhirthday
            today.
          </span>
        </div>
        <img src="assets/ad.jpg" alt="" className="rightBarAd" />
        <h4 className="rightBarTitle">Online Friends</h4>
        <ul className="rightBarFriendList homeFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }
  function ProfileRightBar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightBarFollowButton" onClick={handleClick}>
            {isFollow ? 'Unfollow' : 'Follow'}
            {isFollow ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightBarTitle">User Information</h4>
        <div className="rightBarInfo">
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">City:</span>
            <span className="rightBarInfoValue">{user.city}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">From:</span>
            <span className="rightBarInfoValue">{user.from}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">Relationship:</span>
            <span className="rightBarInfoValue">
              {user.relationship === 1 ? 'single' : 'married'}
            </span>
          </div>
        </div>
        <h4 className="rightBarFriendsTitle">User Friends</h4>
        <ul className="rightBarFriendList profileFriendList ">
          {friends.map((u) => (
            <Link to={'/profile/' + u.username} className="linkTag">
              <li key={u.id} className="rightBarFriend">
                <img
                  src={
                    u.profilePicture
                      ? PF + u.profilePicture
                      : PF + 'noProfile.png'
                  }
                  alt=""
                  className="rightBarFriendImg"
                />
                <span className="rightBarFriendUsername">{u.username}</span>
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }
  return (
    <div className="rightBar">
      <div className="rightBarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
