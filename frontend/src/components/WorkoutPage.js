import React, { useEffect, useState } from 'react';
import apiClient from './apiClient';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

function UserWorkoutPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const currentUser = auth.currentUser; // Replace with the actual current user

  useEffect(() => {
    async function fetchWorkouts(){
      try {
        const response = await apiClient.get(`/users/${currentUser}`);
        // let userWorkouts = response.data.workouts;
        // console.log(userWorkouts);

        setWorkouts(response.data.workouts);
        console.log(workouts)
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [currentUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2>{currentUser}'s Workouts</h2>
          <ListGroup>
            {workouts.map((workout) => (
              <ListGroupItem key={workout._id} >
                <Link>{workout.name}</Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserWorkoutPage;
