import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Methodology from './pages/Methodology';
import ApiDocs from './pages/ApiDocs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-secondary selection:bg-primary/30 font-sans">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/api" element={<ApiDocs />} />
        </Routes>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
