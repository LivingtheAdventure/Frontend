// App.jsx
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import EventDetails from './components/EventPage/EventPage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventDetails/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  )
}

export default App
