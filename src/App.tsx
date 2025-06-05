import React from 'react';
import { TeamsProvider } from './contexts/TeamsContext';
import TeamsDashboard from './pages/TeamsDashboard';

const App = () => {
  return (
    <TeamsProvider>
      <TeamsDashboard />
    </TeamsProvider>
  );
};

export default App;
