import { useNavigate } from 'react-router'
import TitleBarButton from './TitleBarButton'
import { useState } from 'react'
import LeaderboardPopUp from '../../popups/LeaderboardPopUp'

const TitleBarLeaderboardButton = () => {
  const [openPopUp, setOpenPopUp] = useState(false)

  return (
    <>
      <TitleBarButton
        id={'leaderboard'}
        text={'Leaderboard'}
        method={() => {
          setOpenPopUp(true)
        }}
      />
      {openPopUp && <LeaderboardPopUp onClose={() => setOpenPopUp(false)} />}
    </>
  )
}

export default TitleBarLeaderboardButton
