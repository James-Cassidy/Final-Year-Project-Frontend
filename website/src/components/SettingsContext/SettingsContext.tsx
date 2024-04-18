import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { unsubscribe } from 'diagnostics_channel'
import { createContext, useState } from 'react'
import { load, store } from '../../utils/session-storage'

type StyleOptions = 'light' | 'dark' | 'contrast'

// Settings Context object - stores initial values for authentication context
const SettingsContext = createContext({
  getStylePrefix: () => {},
  updateDarkMode: (value: boolean) => {},
  updateHighContrastMode: (value: boolean) => {},
  subscribe: (callback: any) => {},
  unsubscribe: (callback: any) => {},
  updateMuted: (value: boolean) => {},
  getMuted: () => {},
})

// Settings object - contains methods to authenticate the user
const Settings = (props: any) => {
  const [darkMode, setDarkMode] = useState(false)
  const [highContrastMode, setHighContrastMode] = useState(false)
  const [muted, setMuted] = useState(false)

  // List of functions to call when a change is made
  const [subscribers, setSubscribers] = useState([])

  const subscribe = (callback: any) => {
    // @ts-ignore
    setSubscribers([...subscribers, callback])
  }

  const unsubscribe = (thisCallback: any) => {
    setSubscribers(subscribers.filter((callback) => callback !== thisCallback))
  }

  const updateMuted = (value: boolean) => {
    const newState = value
    setMuted(newState)
    store('muted', newState)
    updateValue()
  }

  const getMuted = () => {
    return load('muted') === 'true'
  }

  const updateValue = () => {
    subscribers.forEach((callback: any) => {
      const x = {
        prefix: getStylePrefix(),
        muted: getMuted(),
      }
      callback(x)
    })
  }

  const updateDarkMode = (value: boolean) => {
    if (value === true) {
      setHighContrastMode(false)
      store('dark-mode', true)
      store('high-contrast', false)
      setDarkMode(true)
    } else {
      store('dark-mode', false)
      setDarkMode(false)
    }
    updateValue()
  }

  const updateHighContrastMode = (value: boolean) => {
    if (value === true) {
      setHighContrastMode(true)
      setDarkMode(false)
      store('dark-mode', false)
      store('high-contrast', true)
    } else {
      setHighContrastMode(false)
      store('high-contrast', false)
    }
    updateValue()
  }

  const getStylePrefix = () => {
    if (load('dark-mode') === 'true') {
      return 'dark'
    }
    if (load('high-contrast') === 'true') {
      return 'contrast'
    }
    if (!darkMode && !highContrastMode) {
      return 'light'
    }
    return 'light'
  }

  // Create the Settings context and create all children with the context
  return (
    <SettingsContext.Provider
      value={{
        updateDarkMode,
        updateHighContrastMode,
        getStylePrefix,
        subscribe,
        unsubscribe,
        updateMuted,
        getMuted,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  )
}

export { Settings, SettingsContext }
