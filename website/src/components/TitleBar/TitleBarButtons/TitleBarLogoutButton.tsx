import { useNavigate } from 'react-router'
import TitleBarButton from './TitleBarButton'
import { useState } from 'react'

const TitleBarLogoutButton = ({ method }: any) => {
  const [openHelpPopUp, setOpenHelpPopUp] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    method()
    navigate('/')
  }
  return (
    <>
      <TitleBarButton id={'logout'} text={'Logout'} method={handleLogout} />
    </>
  )
}

export default TitleBarLogoutButton
