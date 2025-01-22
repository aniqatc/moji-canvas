import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UIProvider } from './contexts'
import App from './App';

function AppRouter() {
    return (
        <UIProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/:canvasId" element={<App />} />
                </Routes>
            </Router>
        </UIProvider>
    );
}

export default AppRouter;