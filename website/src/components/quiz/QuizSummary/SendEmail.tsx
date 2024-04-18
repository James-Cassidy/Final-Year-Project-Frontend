import { Alert, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import BackendService from '../../../services/backend-service'
import toast, { Toaster } from 'react-hot-toast'
import '../../../styles/styles.scss'
import { SettingsContext } from '../../SettingsContext/SettingsContext'

interface SendEmailInterface {
  score: number
  numberOfQuestions: number
  numberOfAnsweredQuestions: number
  correctAnswers: number
  wrongAnswers: number
  hintsUsed: number
  fiftyFiftyUsed: number
  time: number
}

const SendEmail = ({
  score,
  numberOfAnsweredQuestions,
  numberOfQuestions,
  correctAnswers,
  wrongAnswers,
  hintsUsed,
  fiftyFiftyUsed,
  time,
}: SendEmailInterface) => {
  const [email, setEmail] = useState('')

  const prefix = useContext(SettingsContext).getStylePrefix()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async () => {
    await BackendService.emailResults(
      email,
      score,
      numberOfQuestions,
      numberOfAnsweredQuestions,
      correctAnswers,
      wrongAnswers,
      hintsUsed,
      fiftyFiftyUsed,
      time
    )
      .then(() => {
        toast.success('Results have been sent')
      })
      .catch((err) => {
        toast.error('Unable to send email')
      })
  }

  return (
    <div
      data-testid={'send-email-container'}
      className={'quiz-summary-button-container'}
    >
      <input
        onChange={handleChange}
        placeholder="Enter an email"
        data-testid={'send-email-text-input'}
        value={email}
      />
      <button
        className={`${prefix}-quiz-summary-button`}
        onClick={handleSubmit}
        data-testid={'send-email-button'}
      >
        Send Email
      </button>
      <Toaster />
    </div>
  )
}

export default SendEmail
