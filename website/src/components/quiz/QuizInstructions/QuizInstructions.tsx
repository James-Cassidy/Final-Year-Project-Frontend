import { Fragment, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PhoneIcon from '@mui/icons-material/Phone'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import '../../../styles/styles.scss'
import { SettingsContext } from '../../SettingsContext/SettingsContext'

const QuizInstructionsHeader = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 data-testid="quiz-header-title">{title}</h1>
      <h3 className={'text-formatting'}>How to play</h3>
    </div>
  )
}

const QuizInstructions = () => {
  const location = useLocation()

  const navigate = useNavigate()

  const handleStartQuiz = () => {
    navigate('/play/context', {
      state: {
        questions: location.state.questions,
        title: location.state.title,
      },
    })
  }

  const handleReturnToMain = () => {
    navigate('/')
  }

  // Context for dark/light/high contrast mode.
  const { getStylePrefix } = useContext(SettingsContext)
  const prefix = getStylePrefix()

  return (
    <Fragment>
      <div
        data-testid={'menu-container'}
        className={`${prefix}-menu-container`}
      >
        <QuizInstructionsHeader title={location.state.title} />
        <ul className="text-formatting" id="main-list">
          <li>
            Each scenerio has a duration of 3 minutes and ends as soon the timer
            ends.
          </li>
          <li>
            Each scenario consists of 7 questions with each question following
            the Cyber Killchain in chronological order. These will be randomised
            each time.
          </li>
          <li>Each question will have 4 options to choose from.</li>
          <li>
            Select the option you believe answers the question most accurately
            by clicking on it. An explaination to the answer will be given if
            you are right or wrong.
          </li>
          <li>
            Each game has 2 lifelines:
            <ul className="text-indent">
              <li>2 50/50 Chance</li>
              <li>5 Hints</li>
            </ul>
          </li>
          <li>
            Select a 50/50 lifeline by clicking on the icon
            <LiveHelpIcon style={{ color: 'white' }} />
            <span className="lifeline"></span>
          </li>
          <ul className="text-indent">
            <li>This will leave 2 answers for you, one right and one wrong</li>
          </ul>
          <li>
            Select a hint by clicking on the icon
            <PhoneIcon color="primary" style={{ color: 'white' }} />
            <span className="lifeline"></span>
          </li>
          <ul className="text-indent">
            <li>
              This will remove on wrong answer and leave three answers for you
            </li>
          </ul>
          <li>
            If you do not undertstand a question you can skip it using the
            'Skip' button.
          </li>
          <li>The timer starts as soon as you are loaded into a scenario.</li>
        </ul>
        <div className="quiz-button-container">
          <button
            data-testid="quiz-nav-main-menu"
            className="quiz-button"
            onClick={handleReturnToMain}
          >
            Back to main menu
          </button>
          <button className="quiz-button" onClick={handleStartQuiz}>
            Next
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default QuizInstructions
