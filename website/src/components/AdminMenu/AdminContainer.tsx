import { useContext, useEffect, useState } from 'react'
import AddUpdateScenario from './AddUpdateScenario'
import '../../styles/styles.scss'
import SubmitScenarioPopup from '../popups/SubmitScenarioPopUp'
import DeleteScenarioButton from './AdminMenuButtons/DeleteScenarioButton'
import ResetLeaderboardButton from './AdminMenuButtons/ResetLeaderboardButton'
import ViewScenarioButton from './AdminMenuButtons/ViewScenarioButton'
import toast, { Toaster } from 'react-hot-toast'
import LoadingClock from '../LoadingClock/LoadingClock'
import BackendService from '../../services/backend-service'
import { LoadingContext } from '../LoadingContext/LoadingContext'
import { SettingsContext } from '../SettingsContext/SettingsContext'

const SubmitButton = ({ scenario }: { scenario: string }) => {
  const [openPopup, setOpenPopup] = useState(false)

  const disabled = isJSON(scenario) ? false : true

  const prefix = useContext(SettingsContext).getStylePrefix()

  return (
    <>
      <SubmitScenarioPopup
        scenario={scenario}
        open={openPopup}
        onClose={() => {
          setOpenPopup(false)
        }}
      />
      <button
        className={`${prefix}-admin-menu-button-right`}
        data-testid="admin-submit-button"
        onClick={() => {
          setOpenPopup(true)
        }}
        disabled={disabled}
      >
        Submit Scenario
      </button>
    </>
  )
}

interface AdminOptionsContainerProps {
  setScenario: React.Dispatch<React.SetStateAction<string>>
  scenarios: string[]
}
const AdminOptionsContainer = ({
  setScenario,
  scenarios,
}: AdminOptionsContainerProps) => (
  <div
    data-testid={'admin-menu-options-container'}
    className={'admin-menu-options'}
  >
    <DeleteScenarioButton scenarios={scenarios} />
    <ViewScenarioButton setScenario={setScenario} scenarios={scenarios} />
    <ResetLeaderboardButton />
  </div>
)

const AdminContainer = () => {
  const [scenario, setScenario] = useState('')
  const [value, setValue] = useState('')
  const [scenarios, setScenarios] = useState([])

  const { updateLoading } = useContext(LoadingContext)

  const { getStylePrefix } = useContext(SettingsContext)
  const stylePrefix = getStylePrefix()

  useEffect(() => {
    updateLoading(true)
    const getScenarios = async () => {
      await BackendService.getAllScenarios()
        .then((resp) => {
          setScenarios(resp.data)
        })
        .catch((err) => {
          toast.error(err.message)
        })
    }
    getScenarios()
    updateLoading(false)
  }, [])

  return (
    <>
      <Toaster />
      <div
        className={`${stylePrefix}-admin-menu-container`}
        data-testid={'admin-menu-wrapper'}
      >
        <AdminOptionsContainer
          setScenario={setScenario}
          scenarios={scenarios}
        />
        <AddUpdateScenario
          scenario={scenario}
          setScenario={setScenario}
          value={value}
          setValue={setValue}
        />
        {isJSON(scenario) ? <>Valid JSON</> : <>Invalid JSON</>}
        <SubmitButton scenario={scenario} />
      </div>
    </>
  )
}

const isJSON = (str: string) => {
  try {
    return JSON.parse(str) && !!str
  } catch (e) {
    return false
  }
}

export default AdminContainer
