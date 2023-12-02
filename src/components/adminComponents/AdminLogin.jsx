import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/login', credentials);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        alert(response.data.message);
        // Redirect or update UI upon successful login
      }
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={credentials.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
