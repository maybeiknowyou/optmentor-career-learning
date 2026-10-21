import { BrowserRouter } from 'react-router-dom'
import { CareerLearningModule } from './app/CareerLearningModule'

function App() {
  const shellMode = new URLSearchParams(window.location.search).get('shell') === 'embedded'
    ? 'embedded'
    : 'standalone'

  return (
    <BrowserRouter>
      <CareerLearningModule shellMode={shellMode} />
    </BrowserRouter>
  )
}

export default App
