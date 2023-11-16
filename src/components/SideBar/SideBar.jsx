import {
  Bookmark,
  CalendarMonth,
  Chat,
  Group,
  PlayCircle,
  QuestionMarkRounded,
  RssFeed,
  School,
  Work,
} from '@mui/icons-material'
import { Users } from '../../dummyData'
import CloseFriend from '../CloseFriend/CloseFriend'
import './sideBar.css'

export default function SideBar() {
  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        <ul className="sideBarList">
          <li className="sideBarListItem">
            <RssFeed className="sideBarItemIcon" />
            <span className="sideBarItemText">Feed</span>
          </li>
          <li className="sideBarListItem">
            <Chat className="sideBarItemIcon" />
            <span className="sideBarItemText">Chats</span>
          </li>
          <li className="sideBarListItem">
            <PlayCircle className="sideBarItemIcon" />
            <span className="sideBarItemText">Videos</span>
          </li>
          <li className="sideBarListItem">
            <Group className="sideBarItemIcon" />
            <span className="sideBarItemText">Groups</span>
          </li>
          <li className="sideBarListItem">
            <Bookmark className="sideBarItemIcon" />
            <span className="sideBarItemText">Bookmarks</span>
          </li>
          <li className="sideBarListItem">
            <QuestionMarkRounded className="sideBarItemIcon" />
            <span className="sideBarItemText">Questions</span>
          </li>
          <li className="sideBarListItem">
            <Work className="sideBarItemIcon" />
            <span className="sideBarItemText">Jobs</span>
          </li>
          <li className="sideBarListItem">
            <CalendarMonth className="sideBarItemIcon" />
            <span className="sideBarItemText">Events</span>
          </li>
          <li className="sideBarListItem">
            <School className="sideBarItemIcon" />
            <span className="sideBarItemText">Courses</span>
          </li>
        </ul>
        <button className="sideBarButton">Show more</button>
        <hr className="sideBarhr" />
        <ul className="sideBarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  )
}
