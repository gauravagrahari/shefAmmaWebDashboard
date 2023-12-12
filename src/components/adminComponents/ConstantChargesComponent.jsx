import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthToken from '../context/useAuthToken';
import config from '../context/constants';

const apiUrl = config.URL;

function ConstantChargesComponent() {
  const token = useAuthToken();
  const [charges, setCharges] = useState({
    deliveryCharges: '',
    packagingCharges: '',
    handlingCharges: '',
    discount: '',
    breakfastStartTime: '',
    lunchStartTime: '',
    dinnerStartTime: '',
    breakfastEndTime: '',
    lunchEndTime: '',
    dinnerEndTime: '',
    breakfastBookTime: '',
    lunchBookTime: '',
    dinnerBookTime: ''
  });

  useEffect(() => {
    const fetchCharges = async () => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      try {
        const response = await axios.get(`${apiUrl}/admin/getCharges`, { headers });
        setCharges(response.data);
      } catch (error) {
        console.error('Error fetching charges:', error);
        alert('Error fetching data');
      }
    };

    fetchCharges();
  }, [token]);  // Dependency array includes token

  const handleChange = (e) => {
    setCharges({ ...charges, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/admin/updateCharges`, charges, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      alert('Charges updated successfully');
    } catch (error) {
      console.error('Error updating charges:', error);
      alert('Error updating charges');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.entries(charges).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Update Charges</button>
      </form>
    </div>
  );
}

export default ConstantChargesComponent;
