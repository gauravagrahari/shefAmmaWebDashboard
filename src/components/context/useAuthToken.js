// useAuthToken.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthToken = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Adjust the path as per your routing setup
    }
  }, [navigate, token]);

  return token;
};

export default useAuthToken;
