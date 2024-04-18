import { useState } from 'react'
import DeleteScenarioPopUp from '../../popups/DeleteScenarioPopUp'
import AdminOptionButton from './AdminOptionButton'

interface DeleteScenarioButtonProps {
  scenarios: string[]
}

const DeleteScenarioButton = ({ scenarios }: DeleteScenarioButtonProps) => {
  const [openDeleteScenarioPopUp, setOpenDeleteScenarioPopUp] = useState(false)

  return (
    <>
      <DeleteScenarioPopUp
        scenarios={scenarios}
        open={openDeleteScenarioPopUp}
        onClose={() => {
          setOpenDeleteScenarioPopUp(false)
        }}
      />
      <AdminOptionButton
        method={() => {
          setOpenDeleteScenarioPopUp(true)
        }}
        id="delete-scenario"
        title="Delete a Scenario"
      />
    </>
  )
}

export default DeleteScenarioButton
