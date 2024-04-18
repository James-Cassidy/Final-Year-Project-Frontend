import { Fragment, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../../styles/styles.scss'
import { SettingsContext } from '../../SettingsContext/SettingsContext'

const QuizContextHeader = ({ title }: { title: string }) => {
  return (
    <div>
      <h1>Context</h1>
      <h3 className={'text-formatting'}>The Business</h3>
    </div>
  )
}

const QuizContext = () => {
  const location = useLocation()

  // Context for dark/light/high contrast mode.
  const { getStylePrefix } = useContext(SettingsContext)
  const prefix = getStylePrefix()

  const navigate = useNavigate()

  const handleStartQuiz = () => {
    navigate('/play/quiz', {
      state: {
        questions: location.state.questions,
        title: location.state.title,
      },
    })
  }

  const handleReturnToMain = () => {
    navigate('/')
  }

  return (
    <Fragment>
      <div className={`${prefix}-menu-container`}>
        <QuizContextHeader title={location.state.title} />
        <ul className="text-formatting" id="main-list">
          <li>
            The business in question used for each scenario is a global
            insurance provider called 'Sure Safe', that offers a wide range of
            insurance products and services to both indivduals and businesses.
          </li>
          <li>
            This includes:
            <ul className="text-indent">
              <li>
                Personal Insurance: They provide various types of personal
                insurance policies such as auto, home, life, and health
                insurance. These policies help individuals and families protect
                against financial losses due to accidents, property damage,
                illness, or death.
              </li>
              <li>
                Business Insurance: Sure Safe offers a variety of business
                insurance policies, including general liability, workers’
                compensation, and commercial property insurance. These policies
                protect businesses from financial losses due to lawsuits,
                employee injuries, and property damage.
              </li>
              <li>
                Customer Service: They have a dedicated customer service team to
                assist policyholders with policy questions, premium payments,
                and policy renewals.
              </li>
            </ul>
          </li>
          <li>
            Insurance companies can be attractive targets for cyber criminals
            due to several reasons including:
            {/* <img src= alt="Quiz App Fifty-Fifty example"/> */}
            <ul className="text-indent">
              <li>
                Valuable Data: Insurance companies hold a wealth of sensitive
                data, including personal and financial information about their
                policyholders. This data can be sold on the black market or used
                for identity theft.
              </li>
              <li>
                Financial Transactions: Insurance companies handle large
                financial transactions, which can be attractive for cyber
                criminals looking to intercept these transactions or manipulate
                them for financial gain.
              </li>
              <li>
                Complex Systems: The IT systems of insurance companies can be
                complex and interconnected. This complexity can create security
                vulnerabilities that cyber criminals can exploit.
              </li>
              <li>
                Regulatory Compliance: Insurance companies are subject to
                various regulatory requirements, some of which involve
                maintaining certain data for extended periods. Cyber criminals
                might target this stored data, especially if it’s not adequately
                protected.
              </li>
              <li>
                Third-Party Risk: Insurance companies often work with various
                third parties, such as brokers and healthcare providers. Cyber
                criminals can exploit weak security practices in these third
                parties to gain access to the insurance company’s systems.
              </li>
            </ul>
          </li>
          <li>
            It’s important for insurance companies to have robust cybersecurity
            measures in place to protect against these potential threats. This
            includes regular risk assessments, employee training, data
            encryption, and incident response plans. Using a hypothetical
            business like Sure Safe shows you what is at stake if bad actors
            attack.
          </li>
        </ul>
        <div className="quiz-button-container">
          <button className="quiz-button" onClick={handleReturnToMain}>
            Back to main menu
          </button>
          <button className="quiz-button" onClick={handleStartQuiz}>
            Start the quiz
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default QuizContext
