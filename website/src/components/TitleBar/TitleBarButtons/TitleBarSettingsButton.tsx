import SettingsPopUp from '../../popups/SettingsPopUp'
import TitleBarButton from './TitleBarButton'
import { useState } from 'react'

const TitleBarSettingsButton = () => {
  const [openPopUp, setOpenPopUp] = useState(false)

  return (
    <>
      <TitleBarButton
        id={'settings'}
        text={'Settings'}
        method={() => {
          setOpenPopUp(true)
        }}
      />
      <SettingsPopUp open={openPopUp} onClose={() => setOpenPopUp(false)} />
    </>
  )
}

export default TitleBarSettingsButton
