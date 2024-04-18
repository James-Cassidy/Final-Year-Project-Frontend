import { useState } from 'react'
import ResetLeaderboardPopup from '../../popups/ResetLeaderboardPopUp'
import AdminOptionButton from './AdminOptionButton'

const ResetLeaderboardButton = () => {
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <>
      <AdminOptionButton
        id="reset-leaderboard"
        title="Reset the leaderboard"
        method={() => setOpenPopup(true)}
      />
      <ResetLeaderboardPopup
        open={openPopup}
        onClose={() => {
          setOpenPopup(false)
        }}
      />
    </>
  )
}

export default ResetLeaderboardButton
