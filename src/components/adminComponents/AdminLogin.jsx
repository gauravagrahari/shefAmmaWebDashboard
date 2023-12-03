import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../context/constants';

const apiUrl = config.URL;
function AdminLogin() {
  const [credentials, setCredentials] = useState({ phone: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
const authRequest={   phone: credentials.phone,
  password: credentials.password};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/admin/Login`, authRequest);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('uuidAdmin', response.data.uuidAdmin);
        localStorage.setItem('timeStamp', response.data.timeStamp);
        navigate('/dashboard'); // Navigate to the desired route after login
      }
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data);
      } else {
        setLoginError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={credentials.phone}
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
