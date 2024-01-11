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
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label htmlFor="phone" style={labelStyle}>Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={credentials.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Login</button>
        {loginError && <p style={errorStyle}>{loginError}</p>}
      </form>
    </div>
  );
}
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f2f2f2',
};

const formStyle = {
  padding: '20px',
  background: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '300px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const errorStyle = {
  color: '#ff0000',
  marginTop: '10px',
};
export default AdminLogin;
