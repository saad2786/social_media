import './online.css'

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <>
      <li className="rightBarFriend">
        <div className="rightBarProfileImgContainer">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + 'noProfile.jpg'
            }
            alt="frined"
            className="rightBarFriendImg"
          />
          <span className="rightBarOnline"></span>
        </div>
        <span className="rightBarFriendText">{user.username}</span>
      </li>
    </>
  )
}
