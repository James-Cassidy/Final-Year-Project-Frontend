import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import isEmpty from '../../utils/is-empty'
import correctNotification from '../../assets/audio/correct-answer.mp3'
import wrongNotification from '../../assets/audio/wrong-answer.mp3'
import buttonSound from '../../assets/audio/button-sound.mp3'
import '../../styles/styles.scss'
import PhoneIcon from '@mui/icons-material/Phone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import withRouter from '../Router/Router'
import toast, { Toaster } from 'react-hot-toast'
import { SettingsContext } from '../SettingsContext/SettingsContext'

interface PlayPropsInterface {
  state?: any
  history?: any
  router?: any
  location: any
  style: any
  muted: any
}

interface PlayStateInterface {
  questions: any[]
  currentQuestion: any
  nextQuestion: any
  previousQuestion: any
  answer: string
  numberOfQuestions: number
  numberOfAnsweredQuestions: number
  currentQuestionIndex: number
  score: number
  correctAnswers: number
  wrongAnswers: number
  hints: number
  fiftyFifty: number
  prefix: string
  usedFiftyFifty: boolean
  nextButtonDisabled: boolean
  muted: any
  previousButtonDisabled: boolean
  previousRandomNumbers: any
  time: any
  state: any
}

class Play extends Component<PlayPropsInterface, PlayStateInterface> {
  correctSound: any
  correctTimeout: any
  wrongTimeout: any
  state: any
  interval: any
  wrongSound: any
  buttonSound: any
  getStylePrefix: any

  constructor(props: PlayPropsInterface) {
    super(props)
    this.state = {
      questions: this.props.router.location.state.questions,
      title: this.props.router.location.state.title,
      prefix: this.props.style.prefix,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: '',
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      muted: this.props.muted.muted,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      time: {},
    }
    this.interval = null
    this.correctSound = React.createRef()
    this.wrongSound = React.createRef()
    this.buttonSound = React.createRef()
  }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state
    // @ts-ignore
    this.context.subscribe(this.handleContextChange)
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    )
    this.startTimer()
  }

  handleContextChange = (context: { prefix: string; muted: boolean }) => {
    console.log(context)
    this.setState({
      prefix: context.prefix,
      muted: context.muted,
    })
  }

  componentWillUnmount() {
    // @ts-ignore
    this.context.unsubscribe(this.handleContextChange)
    clearInterval(this.interval)
  }

  displayStages = (
    stages = this.state.stages,
    currentStage: any,
    nextStage: any,
    previousStage: any
  ) => {
    let { currentStageIndex } = this.state
    if (!isEmpty(this.state.questions.stages)) {
      const answer = currentStage.answer
      this.setState({}, () => {
        this.showOptions()
        this.handleDisableButton()
      })
    }
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion: any,
    nextQuestion: any,
    previousQuestion: any
  ) => {
    let { currentQuestionIndex, currentStageIndex } = this.state
    if (!isEmpty(this.state.questions /*&& this.state.questions.stage*/)) {
      questions = this.state.questions
      currentQuestion = questions[currentQuestionIndex]
      nextQuestion = questions[currentQuestionIndex + 1]
      previousQuestion = questions[currentQuestionIndex - 1]
      const answer = currentQuestion.answer
      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          this.showOptions()
          this.handleDisableButton()
        }
      )
    }
  }

  handleOptionClick = (e: any) => {
    const muted = this.state.muted
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      if (!muted) {
        this.correctTimeout = setTimeout(() => {
          this.correctSound.current.play()
        }, 500)
      }
      this.correctAnswer()
    } else {
      if (!muted) {
        this.wrongTimeout = setTimeout(() => {
          this.wrongSound.current.play()
        }, 500)
      }
      this.wrongAnswer()
    }
  }

  handleNextButtonClick = () => {
    this.playButtonSound()
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          )
        }
      )
    }
  }

  playButtonSound = () => {
    if (!this.state.muted) {
      this.buttonSound.current.play()
    }
  }

  correctAnswer = () => {
    toast.success(
      `Correct Answer! - ${this.state.currentQuestion.explaination}`
    )

    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame()
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          )
        }
      }
    )
  }

  wrongAnswer = () => {
    navigator.vibrate(1000)
    toast.error(`Wrong Answer! - ${this.state.currentQuestion.explaination}`)
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame()
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          )
        }
      }
    )
  }

  showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'))

    options.forEach((option: any) => {
      option.style.visibility = 'visible'
    })

    this.setState({
      usedFiftyFifty: false,
    })
  }

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll('.option'))
      let indexOfAnswer

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index
        }
      })

      while (true) {
        const randomNumber = Math.round(Math.random() * 3)
        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option: any, index) => {
            if (index === randomNumber) {
              option.style.visibility = 'hidden'
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers:
                  prevState.previousRandomNumbers.concat(randomNumber),
              }))
            }
          })
          break
        }
        if (this.state.previousRandomNumbers.length >= 3) break
      }
    }
  }

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll('.option')
      const randomNumbers: any[] = []
      let indexOfAnswer

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index
        }
      })

      let count = 0
      do {
        const randomNumber = Math.round(Math.random() * 3)
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber)
            count++
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3)
              if (
                !randomNumbers.includes(newRandomNumber) &&
                newRandomNumber !== indexOfAnswer
              ) {
                randomNumbers.push(newRandomNumber)
                count++
                break
              }
            }
          }
        }
      } while (count < 2)

      options.forEach((option: any, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = 'hidden'
        }
      })
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true,
      }))
    }
  }
  //Timer code
  startTimer = () => {
    const countDownTime = Date.now() + 180000
    this.interval = setInterval(() => {
      const now = Date.now()
      const distance = countDownTime - now

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(this.interval)
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            this.endGame()
          }
        )
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
            distance,
          },
        })
      }
    }, 1000)
  }

  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      })
    } else {
      this.setState({
        previousButtonDisabled: false,
      })
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      })
    } else {
      this.setState({
        nextButtonDisabled: false,
      })
    }
  }

  endGame = () => {
    const { state } = this
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hints,
      minutes: state.time.minutes,
      seconds: state.time.seconds,
    }
    setTimeout(() => {
      this.props.router.navigate('/play/quizSummary', { state: playerStats })
    }, 1000)
  }

  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      fiftyFifty,
      hints,
      numberOfQuestions,
      time,
      prefix,
    } = this.state

    return (
      <Fragment>
        <Fragment>
          <audio ref={this.correctSound} src={correctNotification}></audio>
          <audio ref={this.wrongSound} src={wrongNotification}></audio>
          <audio ref={this.buttonSound} src={buttonSound}></audio>
        </Fragment>
        <div
          data-testid="questions-container"
          className={`${prefix}-questions`}
        >
          <h2>{this.state.title}</h2>
          <h3>{currentQuestion.stage}</h3>
          <div className="lifeline-container">
            <p>
              <span
                onClick={this.handleFiftyFifty}
                data-testid="fiftyfifty-button"
                className="Phone Icon"
              >
                {' '}
                <LiveHelpIcon
                  style={{ color: prefix === 'contrast' ? 'black' : 'white' }}
                />
                <span className="lifeline">{fiftyFifty}</span>
              </span>
            </p>
            <p>
              <span
                onClick={this.handleHints}
                data-testid="hint-button"
                className="Hint Icon"
              >
                {' '}
                <PhoneIcon
                  color="primary"
                  style={{ color: prefix === 'contrast' ? 'black' : 'white' }}
                />
                <span className="lifeline">{hints}</span>
              </span>
            </p>
          </div>
          <div className="timer-container">
            <p>
              <span className="left" style={{ float: 'left' }}>
                {currentQuestionIndex + 1} of {numberOfQuestions}
              </span>
              <span
                className={classnames('right valid', {
                  warning: time.distance <= 120000,
                  invalid: time.distance < 30000,
                })}
              >
                {time.minutes}:{time.seconds}
                <span className="Time Icon">
                  <AccessTimeIcon style={{ color: 'white' }} />
                </span>
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p
              data-testid="option-a"
              onClick={this.handleOptionClick}
              className="option"
            >
              {currentQuestion.optionA}
            </p>
            <p
              data-testid="option-b"
              onClick={this.handleOptionClick}
              className="option"
            >
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p
              data-testid="option-c"
              onClick={this.handleOptionClick}
              className="option"
            >
              {currentQuestion.optionC}
            </p>
            <p
              data-testid="option-d"
              onClick={this.handleOptionClick}
              className="option"
            >
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="button-container">
            <button
              className={
                prefix !== 'contrast'
                  ? 'normal-skip-button'
                  : 'contrast-skip-button'
              }
              id="next-button"
              onClick={this.handleNextButtonClick}
            >
              Skip
            </button>

            <Toaster
              position="bottom-center"
              reverseOrder={false}
              toastOptions={{
                style: {
                  width: 800,
                },
              }}
            />
            {/* <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button> */}
          </div>
        </div>
      </Fragment>
    )
  }
}

Play.contextType = SettingsContext

export default withRouter(Play)
