import { useNavigate } from 'react-router'
import TitleBarButton from './TitleBarButton'
import { useState } from 'react'

const TitleBarLoginButton = () => {
  const [openHelpPopUp, setOpenHelpPopUp] = useState(false)

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/admin-login')
  }

  return (
    <>
      <TitleBarButton id={'login'} text={'Admin Login'} method={handleClick} />
    </>
  )
}

export default TitleBarLoginButton
