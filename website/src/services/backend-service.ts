import { API_KEY, BACKEND_IP } from '../config/constants'
import axios from 'axios'

interface QuizQuestionsWrite {
  reconnaissance: object
  weaponisation: object
  delivery: object
  exploitation: object
  installation: object
  command: object
  actions: object
}

class BackendServiceClass {
  getHealth = async () => {
    return await axios.get(`${BACKEND_IP}/health`, {
      headers: {
        'x-api-key': API_KEY,
      },
    })
  }

  emailResults = async (
    target: string,
    score: number,
    numberOfQuestions: number,
    numberOfAnsweredQuestions: number,
    correctAnswers: number,
    wrongAnswers: number,
    hintsUsed: number,
    fiftyFiftyUsed: number,
    time: number
  ) => {
    return await axios.post(
      `${BACKEND_IP}/results/send-email`,
      {
        target: target,
        score: score,
        numberOfQuestions: numberOfQuestions,
        numberOfAnsweredQuestions: numberOfAnsweredQuestions,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        hintsUsed: hintsUsed,
        fiftyFiftyUsed: fiftyFiftyUsed,
        time: time,
      },
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    )
  }

  saveResults = async (
    username: string,
    scenarioName: string,
    score: number,
    numberOfQuestions: number,
    numberOfAnsweredQuestions: number,
    correctAnswers: number,
    wrongAnswers: number,
    hintsUsed: number,
    fiftyFiftyUsed: number,
    time: number
  ) => {
    return await axios.post(
      `${BACKEND_IP}/results/save-results`,
      {
        username: username,
        scenarioName: scenarioName,
        score: score,
        numberOfQuestions: numberOfQuestions,
        numberOfAnsweredQuestions: numberOfAnsweredQuestions,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        hintsUsed: hintsUsed,
        fiftyFiftyUsed: fiftyFiftyUsed,
        time: time,
      },
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    )
  }

  getResults = async (scenarioName: string) => {
    return await axios.post(
      `${BACKEND_IP}/results/get-results?scenarioName=${scenarioName}`,
      {},
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    )
  }

  writeScenario = async (
    scenarioName: string,
    scenarioQuestions: QuizQuestionsWrite
  ) => {
    return await axios.post(
      `${BACKEND_IP}/admin/write?scenarioName=${scenarioName}`,
      {
        reconnaissance: scenarioQuestions.reconnaissance || [],
        weaponisation: scenarioQuestions.weaponisation || [],
        delivery: scenarioQuestions.delivery || [],
        exploitation: scenarioQuestions.exploitation || [],
        installation: scenarioQuestions.installation || [],
        command: scenarioQuestions.command || [],
        actions: scenarioQuestions.actions || [],
      },
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    )
  }

  readScenario = async (scenarioName: string) => {
    return await axios.get(
      `${BACKEND_IP}/admin/read?scenarioName=${scenarioName}`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    )
  }

  getQuestions = async (scenarioName: string) => {
    return await axios.get(
      `${BACKEND_IP}/admin/get-questions?scenarioName=${scenarioName}`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    )
  }

  deleteScenario = async (scenarioName: string) => {
    return await axios.get(
      `${BACKEND_IP}/admin/delete?scenarioName=${scenarioName}`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    )
  }

  resetLeaderboard = async () => {
    return await axios.get(`${BACKEND_IP}/admin/reset-leaderboard`, {
      headers: {
        'x-api-key': API_KEY,
      },
    })
  }

  getAllScenarios = async () => {
    return await axios.get(`${BACKEND_IP}/admin/get-all`, {
      headers: {
        'x-api-key': API_KEY,
      },
    })
  }
}

const BackendService = new BackendServiceClass()

export default BackendService
