import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import apiClient from './apiClient';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const userLoggingIn = {
      username,
      password,
    };

    try {
      const response = await apiClient.post('/users/login',userLoggingIn);
      const data = response.data;
      // console.log(data)
      console.log(localStorage)
      // console.log(localStorage.getItem('currentUser'))

      if (data.message === 'Success') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', userLoggingIn.username)
        // console.log(localStorage)
        setCurrentUser(userLoggingIn.username);
        navigate('/');
      } else {
        setMessage(data.message);
      }
    } catch(err){
      setMessage('An error occurred while login. Please try again.');
      console.error('Registration error:', err);
    }
    // const response = await fetch('http://localhost:8000/users/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(userLoggingIn),
    // });

    // const data = await response.json();



  }

  return (
    <Container>
      <h1 className="text-center mt-5">Login</h1>
      {message && <Alert variant="danger">{message}</Alert>}
      <Form onSubmit={handleLogin}>
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
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
