import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthToken from '../context/useAuthToken';

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
   
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
    axios.get('/guest/getCharges', { headers })
      .then(response => {
        setCharges(response.data);
      })
      .catch(error => {
        alert('Error fetching data');
      });
  }, []);
  

  const handleChange = (e) => {
    setCharges({ ...charges, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/admin/updateCharges', charges)
      .then(response => {
        alert('Charges updated successfully');
      })
      .catch(error => {
        alert('Error updating charges');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.entries(charges).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
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
