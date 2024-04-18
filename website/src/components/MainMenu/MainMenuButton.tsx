import { useContext } from 'react'
import { SettingsContext } from '../SettingsContext/SettingsContext'
import './main-menu.css'

interface MainMenuButton {
  id: string
  method: () => void
  text: string
}

const MainMenuButton = ({ id, method, text }: MainMenuButton) => {
  const { getStylePrefix } = useContext(SettingsContext)
  const prefix = getStylePrefix()

  return (
    <button
      className={`${prefix}-main-menu-button`}
      data-testid={id}
      id={id}
      key={id}
      onClick={method}
    >
      {text}
    </button>
  )
}

export default MainMenuButton
