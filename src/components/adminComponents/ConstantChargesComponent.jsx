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
    dinnerBookTime: '',
    extraHandlingCharges: '', // New field
    maxMeal: '',
  });
  const [initialCharges, setInitialCharges] = useState({});

  useEffect(() => {
    const fetchCharges = async () => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      try {
        const response = await axios.get(`${apiUrl}/admin/getCharges`, { headers });
        setCharges(response.data);
        setInitialCharges(response.data);
      } catch (error) {
        console.error('Error fetching charges:', error);
        alert('Error fetching data');
      }
    };
    fetchCharges();
  }, [token]);

  const handleChange = (e) => {
    setCharges({ ...charges, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (JSON.stringify(charges) === JSON.stringify(initialCharges)) {
      alert('No change detected');
      return;
    }

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

  const groupFields = (fields) => {
    const excludedFields = ['constantCharges', 'sk'];
    const categories = {
      charges: [],
      breakfast: [],
      lunch: [],
      dinner: []
    };

    fields.forEach(([key, value]) => {
      if (!excludedFields.includes(key)) {
        const category = Object.keys(categories).find(c => key.toLowerCase().includes(c)) || 'charges';
        categories[category].push([key, value]);
      }
    });

    return categories;
  };

  const groupedCharges = groupFields(Object.entries(charges));

  return (
    <>
      <form onSubmit={handleSubmit} style={formStyle}>
        {Object.entries(groupedCharges).map(([category, fields]) => (
          <div key={category} style={columnStyle}>
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            {fields.map(([key, value]) => (
              <div key={key}>
                <label htmlFor={key} style={labelStyle}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                  {key === 'cancelCutOffTime' ? ' (seconds)' : ''}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
        ))}
      </form>
      <div style={buttonContainerStyle}>
          <button type="submit" onClick={handleSubmit} style={buttonStyle}>Update Charges</button>
        </div>  
    </>
  );
}
const formStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
  backgroundColor: '#f7f7f7',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '1200px',
  margin: 'auto'
};

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  margin: '0 15px' // Increased margin for spacing between columns
};

const inputStyle = {
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%'
};

const labelStyle = {
  fontWeight: 'bold',
  color: '#333',
  display: 'block',
  margin: '10px 0 5px'
};
const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px'
};
const buttonStyle = {
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer',
  marginTop: '20px',
  width: '150px',  
  height: '70px',  
  alignSelf: 'center'
};


export default ConstantChargesComponent;