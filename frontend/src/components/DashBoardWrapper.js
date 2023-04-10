import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

function DashboardWrapper() {
  const token = localStorage.getItem('token');


  return token ? <Dashboard /> : <Navigate to="/login" />;
}

export default DashboardWrapper;
