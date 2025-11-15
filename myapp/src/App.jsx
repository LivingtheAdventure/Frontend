// App.jsx
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import EventDetails from './components/EventPage/EventPage.jsx'
import TreksHome from './components/Traks/Home/Home.jsx'
import TripsHome from './components/Trips/Home/Home.jsx'
import AdventureHome from './components/Adventure/Home/Home.jsx'
import PeakHome from './components/Peak/Home/Home.jsx'
import ParkDevHome from './components/ParkDev/Home/Home.jsx'
// import ProfileHome from './components/Profile/Home/Home.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventDetails/:id" element={<EventDetails />} />
        <Route path="/treks" element={<TreksHome />} />
        <Route path='/trips' element={<TripsHome />} />
        <Route path='/adventure-activity' element={<AdventureHome />} />
        <Route path='/peak-expedition' element={<PeakHome />} />
        <Route path='/park-development-design' element={<ParkDevHome />} />
        {/* <Route path='/profile' element={<ProfileHome />} /> */}
      </Routes>
    </Router>
  )
}

export default App
