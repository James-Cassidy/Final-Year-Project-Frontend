import { useState } from 'react'
import ViewScenarioPopUp from '../../popups/ViewScenarioPopUp'
import AdminOptionButton from './AdminOptionButton'

interface ViewScenarioButtonProps {
  setScenario: React.Dispatch<React.SetStateAction<string>>
  scenarios: string[]
}
const ViewScenarioButton = ({
  setScenario,
  scenarios,
}: ViewScenarioButtonProps) => {
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <>
      <AdminOptionButton
        id="view-scenario"
        title="View Scenario"
        method={() => {
          setOpenPopup(true)
        }}
      />
      <ViewScenarioPopUp
        open={openPopup}
        setScenario={setScenario}
        scenarios={scenarios}
        onClose={() => {
          setOpenPopup(false)
        }}
      />
    </>
  )
}

export default ViewScenarioButton
