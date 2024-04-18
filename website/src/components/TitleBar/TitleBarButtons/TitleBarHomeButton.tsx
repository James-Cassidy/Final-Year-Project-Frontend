import { useNavigate } from 'react-router'
import TitleBarButton from './TitleBarButton'

const TitleBarHomeButton = () => {
  const navigate = useNavigate()

  const onClickHome = () => {
    navigate('/')
  }

  return <TitleBarButton id={'home'} text={'Home'} method={onClickHome} />
}

export default TitleBarHomeButton
