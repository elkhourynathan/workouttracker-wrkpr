import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import UserWorkouts from './UserWorkouts';
import AddWorkout from './AddWorkout';
import RemoveWorkout from './RemoveWorkout';



function Dashboard() {
    const [message, setMessage] = useState('');


  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        setMessage('You must be logged in to access this page');
      }
    }, []);
  
    return (
      <Container>
        <h1 className="text-center mt-5">Dashboard</h1>
        <AddWorkout />
        <RemoveWorkout />
        <UserWorkouts />
        
      </Container>
    );
  }
  
  export default Dashboard;
  