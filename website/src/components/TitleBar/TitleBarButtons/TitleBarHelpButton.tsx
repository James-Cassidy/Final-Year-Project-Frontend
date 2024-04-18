import HelpPopUp from '../../popups/HelpPopUp'
import TitleBarButton from './TitleBarButton'
import { useState } from 'react'

const TitleBarHelpButton = () => {
  const [openHelpPopUp, setOpenHelpPopUp] = useState(false)

  return (
    <>
      <TitleBarButton
        id={'help'}
        text={'Help'}
        method={() => {
          setOpenHelpPopUp(true)
        }}
      />
      <HelpPopUp open={openHelpPopUp} onClose={() => setOpenHelpPopUp(false)} />
    </>
  )
}

export default TitleBarHelpButton
