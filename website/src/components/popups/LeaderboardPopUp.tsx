import {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import PopUp from './PopUp'
import '../../styles/styles.scss'
import BackendService from '../../services/backend-service'
import toast, { Toaster } from 'react-hot-toast'
import LoadingClock from '../LoadingClock/LoadingClock'
import { SettingsContext } from '../SettingsContext/SettingsContext'

const componentId = 'leaderboard-popup'

interface ResultsTypes {
  Username: String
  Score: number
  NumberOfQuestions: number
  NumberOfAnsweredQuestions: number
  CorrectAnswers: number
  WrongAnswers: number
  HintsUsed: number
  FiftyFiftyUsed: number
  Time: number
}

const LeaderboardPopUp = ({ onClose }: any) => {
  const [top10, setTop10] = useState([])
  const [scenarios, setScenarios] = useState([])

  const [loading, setLoading] = useState(true)

  const [displayedScenario, setDisplayedScenario] = useState(
    'Displaying: SQL Injection'
  )

  // Context for dark/light/high contrast mode.
  const { getStylePrefix } = useContext(SettingsContext)
  const prefix = getStylePrefix()

  // Function to swap between different scenarios
  const getScenarioResults = async (scenario: string) => {
    setLoading(true)
    await BackendService.getResults(scenario)
      .then((resp) => {
        setTop10(resp.data.slice(0, 10))
      })
      .catch((err: any) => {
        toast.error(err.message)
      })
    setLoading(false)
  }

  // initial call to getAllScenarios to generate the buttons
  // as well as calling the default results table option
  const pageSetup = async () => {
    setLoading(true)
    await BackendService.getAllScenarios()
      .then(async (resp) => {
        console.log(resp)
        setScenarios(resp.data)
        setDisplayedScenario('Displaying: ' + resp.data[0])
        // Checks there is a scenario to request results from
        if (!resp.data[0]) {
          return
        }

        // Requests results from the first element in the list
        await BackendService.getResults(resp.data[0])
          .then((resp) => {
            setTop10(resp.data.slice(0, 10))
          })
          .catch((err) => {
            // Outputs a toast if an error occurs in this request
            toast.error(err.message)
          })
      })
      .catch((err) => {
        // Outputs a toast if an error occurs in this request
        toast.error(err.message)
      })

    setLoading(false)
  }

  useEffect(() => {
    pageSetup()
  }, [])

  type SortKeys = keyof ResultsTypes
  type SortOrder = 'ascending' | 'descending'

  const headers: { key: SortKeys; label: string }[] = [
    { key: 'Username', label: 'Nickname' },
    { key: 'Score', label: 'Score' },
    { key: 'NumberOfQuestions', label: 'Total Questions' },
    { key: 'NumberOfAnsweredQuestions', label: 'Number Answered' },
    { key: 'CorrectAnswers', label: 'Correct Answers' },
    { key: 'WrongAnswers', label: 'Wrong Answers' },
    { key: 'HintsUsed', label: 'Hints Used' },
    { key: 'FiftyFiftyUsed', label: '50/50s Used' },
    { key: 'Time', label: 'Time Taken (s)' },
  ]

  const [sortKey, setSortKey] = useState<SortKeys>('Score')
  const [sortOrder, setSortOrder] = useState<SortOrder>('descending')
  const sortedData = useCallback(
    () =>
      sortData({
        tableData: top10,
        sortKey,
        reverse: sortOrder === 'descending',
      }),
    [top10, sortKey, sortOrder]
  )

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')
    setSortKey(key)
  }

  function sortData({
    tableData,
    sortKey,
    reverse,
  }: {
    tableData: ResultsTypes[]
    sortKey: SortKeys
    reverse: boolean
  }) {
    if (!sortKey) return tableData
    const sortedData = top10.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1
    })

    if (reverse) {
      return sortedData.reverse()
    }
    return sortedData
  }

  function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
  }: {
    sortOrder: SortOrder
    columnKey: SortKeys
    sortKey: SortKeys
    onClick: MouseEventHandler<HTMLButtonElement>
  }) {
    return (
      <button
        onClick={onClick}
        className={`${
          sortKey === columnKey && sortOrder === 'ascending'
            ? 'sort-button sort-reverse'
            : 'sort-button'
        }`}
      >
        v
      </button>
    )
  }

  return (
    <>
      <Toaster />
      {loading && <LoadingClock />}
      <PopUp
        id={componentId}
        title={'Leaderboard'}
        name={`${prefix}-menu-container-solid Leaderboard`}
        onClose={onClose}
      >
        <div
          data-testid="leaderboard-popup-text"
          className="pop-up-text-leaderboard"
        >
          <div>
            <div className="selected-scenario">{displayedScenario}</div>
            {
              // Updated to map from the list returned by "getAllScenarios"
              scenarios.map((scenario) => {
                return (
                  // Maps out buttons and passes in selected scenario
                  <button
                    className={`${prefix}-scenario-button`}
                    onClick={() => {
                      getScenarioResults(scenario)
                      setDisplayedScenario('Displaying: ' + scenario)
                    }}
                  >
                    {scenario}
                  </button>
                )
              })
            }
            <table>
              <thead>
                <tr>
                  {headers.map((row) => {
                    return (
                      <td key={row.key}>
                        {row.label}
                        <SortButton
                          columnKey={row.key}
                          onClick={() => changeSort(row.key)}
                          sortOrder={sortOrder}
                          sortKey={sortKey}
                        />
                      </td>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {sortedData().map((user: any, index: number) => {
                  return (
                    <tr key={user.Username + index}>
                      <td>{user.Username}</td>
                      <td>{user.Score}</td>
                      <td>{user.NumberOfQuestions}</td>
                      <td>{user.NumberOfAnsweredQuestions}</td>
                      <td>{user.CorrectAnswers}</td>
                      <td>{user.WrongAnswers}</td>
                      <td>{user.HintsUsed}</td>
                      <td>{user.FiftyFiftyUsed}</td>
                      <td>{user.Time}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </PopUp>
    </>
  )
}

export default LeaderboardPopUp
