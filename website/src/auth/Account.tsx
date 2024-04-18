import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { createContext, useState } from 'react'
import userPool from './userPool'
import { load, remove, store } from '../utils/session-storage'

// Account Context object - stores initial values for authentication context
const AccountContext = createContext({
  authenticate: async (
    Username: string,
    Password: string
  ): Promise<unknown> => {
    throw new Error('authenticate function is not yet initialized')
  },
  getSession: async (): Promise<unknown> => {
    throw new Error('getSession function is not yet initialised')
  },
  logout: () => {},
  isLoggedIn: (): boolean => {
    return false
  },
})

// Account object - contains methods to authenticate the user
const Account = (props: any) => {
  const [authenticated, setAuthenticated] = useState(false)

  // Will get the current session of the user from the user pool
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser()
      if (user) {
        user.getSession((err: any, session: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(session)
          }
        })
      } else {
        reject()
      }
    })
  }

  const isLoggedIn = () => {
    return !!load('accessToken')
  }

  // Will authenticate the user by checking the username and password entered are correct
  const authenticate = async (Username: string, Password: string) => {
    return await new Promise((resolve, reject) => {
      try {
        const user = new CognitoUser({
          Username: Username,
          Pool: userPool,
        })

        const authDetails = new AuthenticationDetails({
          Username: Username,
          Password: Password,
        })

        // Handle success, failure and password change required
        user.authenticateUser(authDetails, {
          onSuccess: (data) => {
            const accessToken = data.getAccessToken().getJwtToken()
            const idToken = data.getIdToken().getJwtToken()
            const refreshToken = data.getIdToken().getJwtToken()

            store('accessToken', accessToken)
            store('idToken', idToken)
            store('refreshToken', refreshToken)

            setAuthenticated(true)
            resolve(data)
          },
          onFailure: (err) => {
            console.error('onFailure: ', err)
            reject(err)
          },
          newPasswordRequired: (data) => {
            setAuthenticated(false)
            resolve(data)
          },
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  // Handle the logout method
  const logout = () => {
    const user = userPool.getCurrentUser()
    if (user) {
      setAuthenticated(false)
      user.signOut()
      remove('accessToken')
      remove('idToken')
      remove('refreshToken')
    }
  }

  // Create the account context and create all children with the context
  return (
    <AccountContext.Provider
      value={{ authenticate, getSession, logout, isLoggedIn }}
    >
      {props.children}
    </AccountContext.Provider>
  )
}

export { Account, AccountContext }
