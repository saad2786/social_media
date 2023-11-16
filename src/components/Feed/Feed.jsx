import Post from '../Post/Post'
import Share from '../Share/Share'
import axios from 'axios'
import './feed.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Feed({ username }) {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)
  useEffect(
    function () {
      async function fetchPosts() {
        const res = username
          ? await axios.get('/posts/profile/' + username)
          : await axios.get('posts/timeline/' + user._id.$oid)
        setPosts(res.data)
      }
      fetchPosts()
    },
    [username, user._id],
  )
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((post) => {
          return <Post key={post._id} post={post} />
        })}
      </div>
    </div>
  )
}
