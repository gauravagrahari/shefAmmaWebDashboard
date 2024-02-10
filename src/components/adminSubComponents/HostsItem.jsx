import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../index.css'; 
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl =  config.URL;
const HostsItem = ({ hostData, onHostUpdated }) => {
  const [editableHost, setEditableHost] = useState({
      ...hostData,
      status: hostData.status // status is a boolean
  });
  const [lastEditedAttribute, setLastEditedAttribute] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('new');

  const navigate = useNavigate();
  const token = useAuthToken(); 
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const handleChange = (e) => {
    setEditableHost({ 
      ...editableHost, 
      [e.target.name]: e.target.name === 'status' ? (e.target.value === 'true') : e.target.value 
    });
    setLastEditedAttribute(e.target.name);
  };

  const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
  };
  const handleUpdate = async () => {
    if (!lastEditedAttribute) {
        alert('No changes detected.');
        return;
    }

    const updatedHost = {
      ...editableHost,
      [lastEditedAttribute]: lastEditedAttribute === 'status' ? editableHost.status : editableHost[lastEditedAttribute]
    };

    try {
      const response = await axios.put(`${apiUrl}/admin/updateHost`, updatedHost, {
          headers,
          params: { attributeName: lastEditedAttribute }
      });
      console.log('Update response:', response.data);
      alert('Details updated successfully!');
        
        setEditableHost(updatedHost);

        // Update local storage
        const hostsInStorage = JSON.parse(localStorage.getItem('hosts')) || [];
        const updatedHostsInStorage = hostsInStorage.map(host => 
            host.uuidHost === updatedHost.uuidHost ? updatedHost : host
        );
        localStorage.setItem('hosts', JSON.stringify(updatedHostsInStorage));


        if (onHostUpdated) {
            onHostUpdated(updatedHost);
        }
    } catch (error) {
        console.error('Error updating host:', error);
        alert('Failed to update details.');
    }
};
  
    const handleViewOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/hostOrders`, {
          headers: { ...headers, hostID: editableHost.uuidHost }
        });
        console.log('Orders:', response.data);
        navigate('/order-list-host', { state: { hostDetails: editableHost, orders: response.data } });
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders.');
      }
    };
    const handleViewOrdersByStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/getOrdersByStatus`, {
          headers: { ...headers, id: editableHost.uuidHost },
          params: { gsiName: 'gsi1', status: selectedStatus }
        });
          console.log('Orders:', response.data);
          navigate('/order-list-host', { state: { hostDetails: editableHost, orders: response.data } });
        } catch (error) {
          console.error('Error fetching orders:', error);
          alert('Failed to fetch orders.');
      }
  };
  const handleViewMeals = () => {
    navigate('/meals-list', { state: { hostId: hostData.uuidHost } });
};
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '5px',
  },
  fieldContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  inputFieldShort: {
    margin: '5px',
    width: '50px', // Adjusted width for 'Provided Meals'
  },
  inputField: {
    margin: '5px',
    // flexGrow: 1,
    width: '140px',
  },
  textArea: {
    margin: '5px',
    flexGrow: 2, // Allow more space
    minWidth: '200px', // Minimum width
  },
  dropdownField: {
    margin: '5px',
    flexGrow: 1,
  },
  ratingField: {
    margin: '5px',
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: '5px',
  },
  button: {
    margin: '5px 0',
    padding: '8px 12px',
  },
};

// Individual button styles
const updateButtonStyle = { ...styles.button, backgroundColor: '#4CAF50', color: 'white' };
const viewOrdersButtonStyle = { ...styles.button, backgroundColor: '#2196F3', color: 'white' };
const viewMealsButtonStyle = { ...styles.button, backgroundColor: '#f44336', color: 'white' };

return (
  <div style={styles.container}>
    <div style={styles.fieldContainer}>
      <input
        type="text"
        name="nameHost"
        placeholder="Name"
        value={editableHost.nameHost}
        onChange={handleChange}
        style={styles.inputField}
      />
      <select
        name="status"
        value={editableHost.status ? 'true' : 'false'}
        onChange={handleChange}
        style={styles.dropdownField}
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={editableHost.phone}
        onChange={handleChange}
        style={styles.inputField}
      />
      <textarea
        name="descriptionHost"
        placeholder="Description"
        value={editableHost.descriptionHost}
        onChange={handleChange}
        style={styles.textArea}
      />
      <input
        type="text"
        name="providedMeals"
        placeholder="Provided Meals"
        value={editableHost.providedMeals}
        onChange={handleChange}
        style={styles.inputFieldShort}
      />
      <div style={styles.ratingField}>
        Rating: {editableHost.ratingHost}
      </div>
    </div>
    <div style={styles.buttonContainer}>
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        style={styles.dropdownField}
      >
        <option value="new">New</option>
        <option value="ip">In Progress</option>
        <option value="pkd">Picked</option>
        <option value="com">Completed</option>
        <option value="can">Cancelled</option>
        <option value="unpkd">Unpicked</option>
        <option value="undel">Undelivered</option>
      </select>
      <button onClick={handleUpdate} style={updateButtonStyle}>Update Details</button>
      <button onClick={handleViewOrders} style={viewOrdersButtonStyle}>View Orders</button>
      <button onClick={handleViewMeals} style={viewMealsButtonStyle}>Get Meals</button>
    </div>
  </div>
);
};

export default HostsItem;
