import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Account } from './auth/Account'
import RenderRoutes from './config/routes'
import { Loader } from './components/LoadingContext/LoadingContext'
import { Settings } from './components/SettingsContext/SettingsContext'

function App() {
  document.title = 'Hack Attack'

  return (
    <Account>
      <Settings>
        <Loader>
          <BrowserRouter>
            <RenderRoutes />
          </BrowserRouter>
        </Loader>
      </Settings>
    </Account>
  )
}

export default App
