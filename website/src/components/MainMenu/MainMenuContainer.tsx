import { useContext, useEffect, useState } from 'react'
import MainMenuButton from './MainMenuButton'
import { useNavigate } from 'react-router'
import BackendService from '../../services/backend-service'
import LoadingClock from '../LoadingClock/LoadingClock'
import toast, { Toaster } from 'react-hot-toast'
import { SettingsContext } from '../SettingsContext/SettingsContext'
import scenarioName from '../../config/scenarioName'

const MainMenuContainer = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [scenarios, setScenarios] = useState([])

  const { getStylePrefix } = useContext(SettingsContext)
  const stylePrefix = getStylePrefix()

  useEffect(() => {
    const getScenarios = async () => {
      await BackendService.getAllScenarios()
        .then((scenarios) => {
          setScenarios(scenarios.data)
          setLoading(false)
        })
        .catch((err) => {
          toast.error(err.message)
        })
    }
    getScenarios()
  }, [])

  return (
    <>
      <Toaster />
      {loading ? (
        <LoadingClock />
      ) : (
        <div
          className={`${stylePrefix}-menu-container`}
          data-testid={'main-menu-wrapper'}
        >
          {scenarios.map((playthrough) => {
            const navigateToQuiz = async () => {
              setLoading(true)
              scenarioName.scenario = playthrough
              await BackendService.getQuestions(playthrough)
                .then((response) => {
                  scenarioName.scenario = playthrough
                  navigate('/play/instructions', {
                    state: {
                      questions: response.data.questions,
                      title: playthrough,
                    },
                  })
                })
                .catch((err) => {
                  toast.error('Unable to retrieve questions')
                })
            }

            return (
              <MainMenuButton
                id={playthrough}
                key={playthrough}
                method={navigateToQuiz}
                text={playthrough}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default MainMenuContainer
