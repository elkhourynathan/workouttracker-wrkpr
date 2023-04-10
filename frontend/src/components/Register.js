import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const user = {
      email,
      username,
      password,
    };

    try {
      const response = await apiClient.post('/users/register',user);
      const data = await response;
      console.log(data);

      if (data.data.message === 'Success') {
        navigate('/login');
      } else {
        setMessage(data.data.message);
      }
    } catch (err){
      setMessage('An error occurred while registering. Please try again.');
      console.error('Registration error:', err);
    }

    // const response = await fetch('http://localhost:8000/users/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(user),
    // });

    // const data = await response.json();


  }

  return (
    <Container>
      <h1 className="text-center mt-5">Register</h1>
      {message && <Alert variant="danger">{message}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
