import { useContext, useState } from 'react'
import PopUp from './PopUp'
import PopUpButton from './PopUpButton'
import BackendService from '../../services/backend-service'
import toast, { Toaster } from 'react-hot-toast'
import { LoadingContext } from '../LoadingContext/LoadingContext'

interface DeleteScenarioPopUpProps {
  scenarios: string[]
  open: boolean
  onClose: () => void
}

const DeleteScenarioPopUp = ({
  scenarios,
  open,
  onClose,
}: DeleteScenarioPopUpProps) => {
  if (!open) return null

  const [checkValue, setCheckValue] = useState('')
  const [titleValue, setTitleValue] = useState('')

  const expected = 'permanently delete'
  const disabled = expected !== checkValue || titleValue === ''

  const { updateLoading } = useContext(LoadingContext)

  const handleChangeTitle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTitleValue(e.target.value)
  }

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckValue(e.target.value)
  }

  const handleClick = async () => {
    updateLoading(true)
    await BackendService.deleteScenario(titleValue)
      .then((deleteSuccessful) => {
        console.log(deleteSuccessful)
        onClose()
      })
      .catch((err) => {
        toast.error(err.message)
      })
    updateLoading(false)
  }

  return (
    <PopUp
      id={'delete-scenario-popup'}
      title="Delete Scenario"
      onClose={onClose}
    >
      <Toaster />
      <div className="PopUpText">
        <p>
          Enter the <i>title</i> of the scenario which you want to delete.*
        </p>
        {/* <input onChange={handleChangeTitle}></input> */}
        <select
          data-testid="scenario-select"
          id="scenario-select"
          className={'pop-up-select'}
          onChange={handleChangeTitle}
        >
          <option key={'null-value'} value={''}></option>
          {scenarios.map((scenario) => {
            return (
              <option key={scenario} value={scenario}>
                {scenario}
              </option>
            )
          })}
        </select>
        <br />
        <p>
          To confirm enter <i>permanently delete</i> into the below text box.
        </p>
        <input
          data-testid="confirmation-input"
          id="confirmation-input"
          onChange={handleChangeCheck}
        ></input>
        <br />
        <p>*Deleting is permenant and cannot be undone</p>
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

export default DeleteScenarioPopUp
