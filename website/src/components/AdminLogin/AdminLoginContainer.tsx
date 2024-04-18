import { useNavigate } from 'react-router'
import '../../styles/styles.scss'
import { useContext, useState } from 'react'
import { AccountContext } from '../../auth/Account'
import toast, { Toaster } from 'react-hot-toast'
import { SettingsContext } from '../SettingsContext/SettingsContext'

// Creates the login form for admin users
const AdminLoginContainer = () => {
  // Navigate hook to allow navigation away from the page
  const navigate = useNavigate()

  // Importing authentication config to validate any users
  const { authenticate } = useContext(AccountContext)

  // Constant to store values from text boxes
  const [username, setUsername] = useState('')
  const [pswrd, setPswrd] = useState('')

  // Get dark/light/high contrast mode from context
  const { getStylePrefix } = useContext(SettingsContext)
  const stylePrefix = getStylePrefix()

  // Check to ensure that a value has been entered before enabling the submit button
  const disabled = username === '' || pswrd === ''

  // function to handle validating the user when the button is clicked
  const validate = async () => {
    await authenticate(username, pswrd)
      .then(() => {
        navigate('/admin-menu')
      })
      .catch((err) => {
        toast.error('Incorrect Username or Password')
      })
  }

  // functions to handle user inputs in text fields
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleChangePswrd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPswrd(e.target.value)
  }

  return (
    // Login container
    <div
      className={`${stylePrefix}-admin-login-menu-container`}
      data-testid={'admin-login-container'}
    >
      {/* Title */}
      <h1 data-testid="admin-login-title" className="admin-login-title">
        Admin Users
      </h1>

      {/* Login Fields */}
      <div className="admin-login-fields">
        <h4 data-testid="username-prompt" className="admin-login-field-spacer">
          Username
        </h4>

        <input
          data-testid="username-input"
          id="username-input"
          onChange={handleChangeUsername}
        />

        <h4 data-testid="password-prompt" className="admin-login-field-spacer">
          Password
        </h4>

        <input
          data-testid="password-input"
          id="password-input"
          type="password"
          onChange={handleChangePswrd}
        />
      </div>

      {/* Login Button */}
      <button
        id="admin-login-submit-button"
        data-testid="admin-login-submit-button"
        className={`${stylePrefix}-admin-login-menu-submit-button`}
        onClick={validate}
        disabled={disabled}
      >
        Login
      </button>
      <Toaster />
    </div>
  )
}

export default AdminLoginContainer
