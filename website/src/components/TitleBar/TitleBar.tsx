import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import './TitleBar.css'
import TitleBarIcon from './TitleBarIcon'
import { Outlet } from 'react-router'
import TitleBarHomeButton from './TitleBarButtons/TitleBarHomeButton'
import TitleBarLeaderboardButton from './TitleBarButtons/TitleBarLeaderboardButton'
import TitleBarHelpButton from './TitleBarButtons/TitleBarHelpButton'
import TitleBarSettingsButton from './TitleBarButtons/TitleBarSettingsButton'
import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../auth/Account'
import TitleBarLogoutButton from './TitleBarButtons/TitleBarLogoutButton'
import TitleBarLoginButton from './TitleBarButtons/TitleBarLoginButton'
import TitleBarAdminMenuButton from './TitleBarButtons/TitleBarAdminMenuButton'
import CustomClockLoader from '../LoadingClock/LoadingClock'
import { LoadingContext } from '../LoadingContext/LoadingContext'
import { SettingsContext } from '../SettingsContext/SettingsContext'

const TitleBar = () => {
  const [status, setStatus] = useState(false)

  const { isLoggedIn, logout } = useContext(AccountContext)
  const authenticated = isLoggedIn()
  const { loading } = useContext(LoadingContext)

  const { getStylePrefix } = useContext(SettingsContext)
  const stylePrefix = getStylePrefix()

  useEffect(() => {
    if (authenticated) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [authenticated, isLoggedIn])

  return (
    <>
      <Box className={'TitleBarBox'}>
        <AppBar
          position="fixed"
          className={`${stylePrefix}-titlebar-background`}
        >
          <Toolbar className={'TitleBar'}>
            <h1 data-testid="titlebar-title" className={'Title'}>
              Hack Attack
            </h1>
            <div
              data-testid="titlebar-button-container"
              className={'TitleBarButtons'}
            >
              <TitleBarHomeButton />
              <TitleBarLeaderboardButton />
              <TitleBarSettingsButton />
              {status ? <TitleBarAdminMenuButton /> : <TitleBarHelpButton />}
              {status ? (
                <TitleBarLogoutButton method={logout} />
              ) : (
                <TitleBarLoginButton />
              )}
            </div>
            <TitleBarIcon />
          </Toolbar>
        </AppBar>
      </Box>
      <div className={`${stylePrefix}-app-background`}>
        <>{loading && <CustomClockLoader />}</>
        <Outlet />
      </div>
    </>
  )
}

export default TitleBar
