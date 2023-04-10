import React, { useState } from 'react';
import apiClient from './apiClient';
import { useAuth } from './AuthContext';
import { Container } from 'react-bootstrap';



function RemoveWorkout() {
    
  const [workoutName, setWorkoutName] = useState('');

  const auth = useAuth();
  const currentUser = auth.currentUser;

  async function handleRemoveWorkout() {
    const remove = {
        name: workoutName
    }

    try{
        await apiClient.post(`users/${currentUser}/workouts/remove`, remove)
        setWorkoutName('');

    } catch(error){
        console.error('Error removing workout: ', error);
    }
  };

  return (
    <Container>
      <h2>Workout Name</h2>
      <input
        type="text"
        placeholder="Workout name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />
      <button onClick={handleRemoveWorkout}>Remove Workout</button>
    </Container>
  );
};

export default RemoveWorkout;
