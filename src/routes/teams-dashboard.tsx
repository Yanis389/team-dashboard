import React from 'react';
import TeamsDashboard from '../pages/TeamsDashboard';
import { TeamsProvider } from '../contexts/TeamsContext';

const TeamsDashboardRoute = () => {
  return (
    <TeamsProvider>
      <TeamsDashboard />
    </TeamsProvider>
  );
};

export default TeamsDashboardRoute;
