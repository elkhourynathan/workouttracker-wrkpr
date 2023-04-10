import React, { useEffect, useState } from 'react';
import apiClient from './apiClient';
import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

function UserWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = localStorage.getItem('currentUser'); 
  // console.log(localStorage)

  useEffect(() => {
    async function fetchWorkouts(){
      try {
        const response = await apiClient.get(`/users/${currentUser}`);
        // let userWorkouts = response.data.workouts;
        // console.log(userWorkouts);

        setWorkouts(response.data.workouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [currentUser,workouts]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container className='centre'>
      <h2>{currentUser}'s Workouts</h2>
      <Accordion defaultActiveKey={0}>
        {workouts.map((workout) => (
          <Accordion.Item eventKey="0" key={workout._id}>
            <Accordion.Header>{workout.name}</Accordion.Header>
            <Accordion.Body>
            {workout.exercises.map((exercise) => (
              <div key={exercise._id} className="mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{exercise.name}</h5>
                    <ul className="list-inline">
                      <li className="list-inline-item">Sets: {exercise.sets}</li>
                      <li className="list-inline-item">Reps: {exercise.reps}</li>
                      <li className="list-inline-item">Weight: {exercise.weight} lbs</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default UserWorkouts;
