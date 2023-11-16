import React, { useContext, useRef, useState } from 'react'
import './share.css'
import {
  PermMedia,
  Label,
  Place,
  EmojiEmotions,
  Cancel,
} from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
export default function Share() {
  const { user } = useContext(AuthContext)
  const desc = useRef()
  const [file, setFile] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  async function handleClick(e) {
    e.preventDefault()
    const newPost = {
      userId: user._id.$oid,
      desc: desc.current.value,
    }
    if (file) {
      const data = new FormData()
      const fileName = Date.now() + '_' + file.name
      data.append('name', fileName)
      data.append('file', file)
      newPost.image = fileName
      try {
        await axios.post('/upload', data)
        console.log(newPost)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await axios.post('/posts', newPost)
      window.location.reload()
    } catch (err) {
      console.log(err)
      e.preventDefault()
    }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={PF + user.profilePicture || PF + 'noProfie.png'}
            alt="shareProfile "
            className="shareProfileImg"
          />
          <input
            type="text"
            placeholder={`What is in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel
              className="shareCancel"
              fontSize="large"
              onClick={() => {
                setFile(null)
              }}
            />
          </div>
        )}
        <form onSubmit={handleClick} className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => {
                  setFile(e.target.files[0])
                }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Place htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  )
}
