import '../../../styles/styles.scss'

const QuizSummaryTable = ({ results, remark }: any) => (
  <table data-testid="results-table" className="results-table">
    <tbody>
      <tr>
        <td>Scenario:</td>
        <td>{results.scenario}</td>
      </tr>
      <tr>
        <td>Score:</td>
        <td>{results.score.toFixed(2)}%</td>
      </tr>
      <tr>
        <td>Number of Questions:</td>
        <td>{results.numberOfQuestions}</td>
      </tr>
      <tr>
        <td>Number of Answered Questions:</td>
        <td>{results.numberOfAnsweredQuestions}</td>
      </tr>
      <tr>
        <td>Correct Answers:</td>
        <td>{results.correctAnswers}</td>
      </tr>
      <tr>
        <td>Wrong Answers:</td>
        <td>{results.wrongAnswers}</td>
      </tr>
      <tr>
        <td>Hints Used:</td>
        <td>{results.hintsUsed}</td>
      </tr>
      <tr>
        <td>50/50 Used:</td>
        <td>{results.fiftyFiftyUsed}</td>
      </tr>
      <tr>
        <td>Time Left:</td>
        <td>
          {results.minutes}:{results.seconds}
        </td>
      </tr>
      <tr>
        <td>Remark:</td>
        <td>{remark}</td>
      </tr>
    </tbody>
  </table>
)

export default QuizSummaryTable
