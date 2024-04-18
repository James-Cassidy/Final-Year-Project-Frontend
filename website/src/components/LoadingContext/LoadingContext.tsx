import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { createContext, useState } from 'react'

// Account Context object - stores initial values for authentication context
const LoadingContext = createContext({
  loading: false,
  updateLoading: (loading: boolean) => {},
})

// Account object - contains methods to authenticate the user
const Loader = (props: any) => {
  const [loading, setLoading] = useState(false)

  const updateLoading = (loading: boolean) => {
    setLoading(loading)
  }
  // Create the account context and create all children with the context
  return (
    <LoadingContext.Provider value={{ loading, updateLoading }}>
      {props.children}
    </LoadingContext.Provider>
  )
}

export { Loader, LoadingContext }
