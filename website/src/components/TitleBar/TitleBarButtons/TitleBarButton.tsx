import { useContext } from 'react'
import '../TitleBar.css'
import { SettingsContext } from '../../SettingsContext/SettingsContext'

interface TitleBarButton {
  id: string
  text: string
  method: () => void
}

const TitleBarButton = ({ id, text, method }: TitleBarButton) => {
  const { getStylePrefix } = useContext(SettingsContext)
  const stylePrefix = getStylePrefix()

  return (
    <button
      className={`${stylePrefix}-title-bar-button`}
      data-testid={`title-bar-navigation-${id}`}
      onClick={method}
    >
      {text}
    </button>
  )
}

export default TitleBarButton
