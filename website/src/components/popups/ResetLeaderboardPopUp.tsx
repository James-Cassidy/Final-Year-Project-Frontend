import { useContext, useState } from 'react'
import PopUp from './PopUp'
import PopUpButton from './PopUpButton'
import BackendService from '../../services/backend-service'
import toast, { Toaster } from 'react-hot-toast'
import { LoadingContext } from '../LoadingContext/LoadingContext'
import { SettingsContext } from '../SettingsContext/SettingsContext'

const ResetLeaderboardPopup = ({ open, onClose }: any) => {
  if (!open) return null

  const [value, setValue] = useState('')

  const expected = 'permanently delete'

  const disabled = expected !== value

  const { updateLoading } = useContext(LoadingContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClick = async () => {
    updateLoading(true)
    await BackendService.resetLeaderboard()
      .then(() => {
        onClose()
      })
      .catch((err) => {
        toast.error(err.message)
      })
    updateLoading(false)
  }

  return (
    <PopUp
      id={'reset-leaderboard-popup'}
      title="Reset Leaderboard"
      onClose={onClose}
    >
      <Toaster />
      <div className="pop-up-text">
        This will empty the results from the database removing all user results.
        <br />
        To confirm enter <i>permanently delete</i> into the below text box.
        <br />
        <input
          data-testid="reset-leaderboard-check-input"
          id="reset-leader-board-check-input"
          onChange={handleChange}
        ></input>
        <br />
        *Deleting is permanent and cannot be undone
      </div>
      <PopUpButton
        id="proceed"
        text={'Proceed'}
        onClose={handleClick}
        className="pop-up-button-proceed"
        disabled={disabled}
      />
    </PopUp>
  )
}

export default ResetLeaderboardPopup
