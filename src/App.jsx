import { useRoutes } from 'react-router-dom'
import { Index } from './routers'
function App() {
  const Router =useRoutes(Index())
  return Router
}

export default App
