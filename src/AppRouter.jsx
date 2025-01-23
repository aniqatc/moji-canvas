import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UIProvider, CanvasProvider } from './contexts';
import App from './App.jsx';

function AppRouter() {
  return (
    <UIProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <CanvasProvider>
                <App />
              </CanvasProvider>
            }
          />
          <Route
            path="/:canvasId"
            element={
              <CanvasProvider>
                <App />
              </CanvasProvider>
            }
          />
        </Routes>
      </Router>
    </UIProvider>
  );
}

export default AppRouter;
