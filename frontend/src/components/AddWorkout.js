import React, { useState } from 'react';
import apiClient from './apiClient';
import { useAuth } from './AuthContext';
import { Container } from 'react-bootstrap';



function AddWorkout() {
    
  const [workoutName, setWorkoutName] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');
  const [exerciseWeight, setExerciseWeight] = useState('');
  const [exercises, setExercises] = useState([]);
  const auth = useAuth();
  const currentUser = auth.currentUser;

  function handleAddExercise() {
    const newExercise = {
      name: exerciseName,
      sets: parseInt(exerciseSets),
      reps: parseInt(exerciseReps),
      weight: parseFloat(exerciseWeight),
    };
    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setExerciseSets('');
    setExerciseReps('');
    setExerciseWeight('');
  };

  function undoExercise() {
    if(exercises.length > 0){
        setExercises(exercises.slice(0,exercises.length-1))
    }
    
  }

  async function handleSubmitWorkout() {
    const workout = {
      name: workoutName,
      exercises: exercises,
    };

    try {
      await apiClient.post(`/users/${currentUser}/workouts`, workout);
      setWorkoutName('');
      setExercises([]);
    } catch (error) {
      console.error('Error submitting workout:', error);
    }
  };

  return (
    <Container className='md-3'>
      <h2>Workout Name</h2>
      <input
        type="text"
        placeholder="Workout name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />

      <h3>Add Exercises</h3>
      <input
        type="text"
        placeholder="Exercise name"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Sets"
        value={exerciseSets}
        onChange={(e) => setExerciseSets(e.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={exerciseReps}
        onChange={(e) => setExerciseReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight"
        value={exerciseWeight}
        onChange={(e) => setExerciseWeight(e.target.value)}
      />
      <button onClick={handleAddExercise}>Add Exercise</button>
      <button onClick={undoExercise}>Undo</button>

      <h3>Exercises</h3>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            {exercise.name}, {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} lbs
          </li>
        ))}
      </ul>

      <button onClick={handleSubmitWorkout}>Submit Workout</button>
    </Container>
  );
};

export default AddWorkout;
