import { ChangeEventHandler, useEffect, useState } from 'react'
import '../../styles/styles.scss'

const AddUpdateInstructions = () => {
  return (
    <div
      data-testid={'admin-scenario-instructions'}
      className="admin-instructions"
    >
      <h4>Instructions</h4>
      <ul>
        <li>
          Use the text box below to enter the questions for a playthrough eg.
          SQL Injection
        </li>
        <li>
          Using the title of an existing playthrough will update its questions.
        </li>
        <li>
          The expected format is outlined below, update the JSON with the new
          values
        </li>
      </ul>
    </div>
  )
}

let initialValue =
  '{\n\t"title":""\n\t"reconnaissance":[\n\t\t{\n\t\t\t"question":"",\n\t\t\t"optionA":"",\n\t\t\t"optionB":"",\n\t\t\t"optionC":"",' +
  '\n\t\t\t"optionD":"",\n\t\t\t"answer":"",\n\t\t\t"stage":"",\n\t\t\t"explaination":""\n\t\t},\n\t\t{\n\t\t\t"question":"",\n\t\t\t"optionA":"",' +
  '\n\t\t\t"optionB":"",\n\t\t\t"optionC":"",\n\t\t\t"optionD":"",\n\t\t\t"answer":"",\n\t\t\t"stage":"",\n\t\t\t"explaination":""\n\t\t}\n\t]' +
  '\n\t"weaponisation":[],' +
  '\n\t"delivery":[],' +
  '\n\t"exploitation":[],' +
  '\n\t"installation":[],' +
  '\n\t"command":[],' +
  '\n\t"actions":[]\n}'

const AddUpdateScenario = ({ scenario, setScenario, value, setValue }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScenario(e.target.value)
    setValue(e.target.value)
  }

  useEffect(() => {
    setValue(scenario)
  }, [scenario])

  return (
    <div data-testid={'scenario-wrapper'} className="scenario-wrapper">
      <div data-testid={'scenario-container'} className="scenario-container">
        <AddUpdateInstructions />

        <textarea
          id={'admin-menu-json-editor'}
          data-testid={'admin-menu-json-editor'}
          placeholder={initialValue}
          className={'admin-scenario-edit-box'}
          cols={12}
          rows={24}
          onChange={handleChange}
          value={value}
        ></textarea>
      </div>
    </div>
  )
}

export default AddUpdateScenario
