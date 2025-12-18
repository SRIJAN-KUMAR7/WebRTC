
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MeetingPage from './pages/MeetingPage';
import CameraTest from './pages/CameraTest';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<CameraTest />} />
        <Route path="/meet/:id" element={<MeetingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
