import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:canvasId" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
