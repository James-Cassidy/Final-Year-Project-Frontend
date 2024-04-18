import { useLocation, useNavigate } from 'react-router'
import scenarioName from '../../../config/scenarioName'
import SaveResults from './SaveResults'
import calculateSeconds from '../../../utils/calculateSeconds'
import SendEmail from './SendEmail'
import QuizSummaryTable from './QuizSummaryTable'
import '../../../styles/styles.scss'
import { useContext } from 'react'
import { SettingsContext } from '../../SettingsContext/SettingsContext'

interface QuizSummaryState {
  scenario: string
  score: number
  numberOfQuestions: number
  numberOfAnsweredQuestions: number
  correctAnswers: number
  wrongAnswers: number
  hintsUsed: number
  fiftyFiftyUsed: number
  minutes: string
  seconds: string
}

const getRemark = (userScore: number): string => {
  if (userScore <= 30) {
    return 'You need a lot more practice'
  } else if (userScore > 30 && userScore <= 50) {
    return 'Better luck next time'
  } else if (userScore <= 70 && userScore > 50) {
    return 'You can still do better'
  } else if (userScore >= 71 && userScore <= 84) {
    return 'Great job!'
  } else {
    return "You're a clever cookie!"
  }
}

const QuizSummary = () => {
  const location = useLocation()
  const { state } = location

  const navigate = useNavigate()

  const { getStylePrefix } = useContext(SettingsContext)
  const prefix = getStylePrefix()

  const handleHomeButton = () => {
    navigate('/')
  }

  const results: QuizSummaryState = {
    scenario: scenarioName.scenario,
    score: (state.score / state.numberOfQuestions) * 100,
    numberOfQuestions: state.numberOfQuestions,
    numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
    correctAnswers: state.correctAnswers,
    wrongAnswers: state.wrongAnswers,
    hintsUsed: state.hintsUsed,
    fiftyFiftyUsed: state.fiftyFiftyUsed,
    minutes: state.minutes,
    seconds: state.seconds,
  }

  const remark: string = getRemark(results.score)

  return (
    <div className={`${prefix}-menu-container-summary`}>
      <h1>Your Summary</h1>
      <QuizSummaryTable results={results} remark={remark} />
      <div>
        <SendEmail
          score={results.score}
          numberOfQuestions={results.numberOfQuestions}
          numberOfAnsweredQuestions={results.numberOfAnsweredQuestions}
          correctAnswers={results.correctAnswers}
          wrongAnswers={results.wrongAnswers}
          hintsUsed={results.hintsUsed}
          fiftyFiftyUsed={results.fiftyFiftyUsed}
          time={calculateSeconds(results.minutes, results.seconds)}
        />
        <SaveResults
          score={results.score}
          numberOfQuestions={results.numberOfQuestions}
          numberOfAnsweredQuestions={results.numberOfAnsweredQuestions}
          correctAnswers={results.correctAnswers}
          wrongAnswers={results.wrongAnswers}
          hintsUsed={results.hintsUsed}
          fiftyFiftyUsed={results.fiftyFiftyUsed}
          time={calculateSeconds(results.minutes, results.seconds)}
        />
      </div>
      <div className="summary-options">
        <button
          data-testid="summary-home-button"
          id="summary-home-button"
          className="quiz-button"
          onClick={handleHomeButton}
        >
          Home
        </button>
        {/* <button className='quiz-button'>Play Again</button> */}
      </div>
    </div>
  )
}

export default QuizSummary
