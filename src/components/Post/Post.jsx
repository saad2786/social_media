import './post.css'
import { MoreVert } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext'
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [user, setUser] = useState({})
  const { user: currentUser } = useContext(AuthContext)
  const [isLiked, setIsLiked] = useState(
    post.likes.includes(currentUser._id.$oid),
  )
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(
    function () {
      async function fetchPosts() {
        const res = await axios.get(`/users?userId=${post.userId}`)

        setUser(res.data)
      }
      fetchPosts()
    },
    [post],
  )

  async function likeHandler() {
    try {
      await axios.put(`posts/${post._id}/like`, {
        userId: currentUser._id.$oid,
      })
    } catch (err) {
      console.log(err)
    }
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'noProfile.png'
                }
                alt="profile"
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postTime">{format(post.createdAt)}</span>
          </div>
          <div className="postTopLRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>

          <img src={PF + post.image} alt="post" className="postImage" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={PF + `${isLiked ? 'like' : 'unlike'}.png`}
              alt="like"
              onClick={likeHandler}
              className="postLikeIcon"
            />
            <img
              src={PF + `${isLiked ? 'heart' : 'notheart'}.png`}
              alt="love"
              onClick={likeHandler}
              className="postLikeIcon"
            />
            <span className="likeCounter">{like} people like post</span>
          </div>
          <div className="postBottomRight">{post.comment || 3} comments</div>
        </div>
      </div>
    </div>
  )
}
