import { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SettingsContext } from '../SettingsContext/SettingsContext'

function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()
    const { getStylePrefix, getMuted } = useContext(SettingsContext)
    const prefix = getStylePrefix()
    const muted = getMuted()
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
        style={{ prefix }}
        muted={{ muted }}
      />
    )
  }

  return ComponentWithRouterProp
}

export default withRouter
