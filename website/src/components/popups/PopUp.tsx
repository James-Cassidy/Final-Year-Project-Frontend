import PopUpButton from './PopUpButton'
import PopUpTitle from './PopUpTitle'
import '../../styles/styles.scss'
import { useContext } from 'react'
import { SettingsContext } from '../SettingsContext/SettingsContext'

interface PopUpInterface {
  id: string
  title: string
  name?: string
  onClose: () => void
  children: any
}

const PopUp = ({ id, title, name, onClose, children }: PopUpInterface) => {
  const { getStylePrefix } = useContext(SettingsContext)
  const prefix = getStylePrefix()
  return (
    <div className={`popup`} data-testid={id}>
      <div className={name ? name : `${prefix}-menu-container-solid`}>
        <PopUpTitle title={title} />
        {children}
        <PopUpButton id={id} onClose={onClose} />
      </div>
    </div>
  )
}

export default PopUp
