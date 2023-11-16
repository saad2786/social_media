import Feed from '../../components/Feed/Feed'
import RightBar from '../../components/RightBar/RightBar'
import SideBar from '../../components/SideBar/SideBar'
import TopBar from '../../components/TopBar/TopBar'
import './home.css'
export default function Home() {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  )
}
