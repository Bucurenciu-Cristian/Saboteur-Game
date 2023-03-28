import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/Slices/authSlice';

const Lobby = '/Lobby';
/*
 * john@example.com
 * password123
 *
 * user1@example.com
 * samplePassword
 * */
const Login: React.FC = () => {
  const [email, setEmail] = useState('user1@example.com');
  const [password, setPassword] = useState('samplePassword');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    /* if (token && userId) {
      router.push(Lobby);
    } */
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the API for login and handle the response
      // Replace this with your actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        let { token, userId } = data;
        userId = Number(userId);
        // Save the JWT token to localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);

        dispatch(login({ userId }));

        router.push(Lobby);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
