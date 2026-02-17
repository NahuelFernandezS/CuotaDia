import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoanSimulator from './components/LoanSimulator';
import ApplicationWizard from './components/ApplicationWizard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoanSimulator />} />
        <Route path="/aplicar" element={<ApplicationWizard />} />
      </Routes>
    </Router>
  );
}

export default App;
