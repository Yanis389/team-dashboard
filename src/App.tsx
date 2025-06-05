import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TeamsProvider } from './contexts/TeamsContext';
import TeamManagementPage from './pages/TeamManagementPage';

const App: React.FC = () => {
  return (
    <TeamsProvider>
      <Router>
        <Routes>
          <Route path="/teams" element={<TeamManagementPage />} />
        </Routes>
      </Router>
    </TeamsProvider>
  );
};

export default App;
