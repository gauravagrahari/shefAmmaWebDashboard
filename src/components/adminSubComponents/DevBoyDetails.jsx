import React, { useState } from 'react';
import axios from 'axios';
import '../../index.css'; 
import { useNavigate } from 'react-router-dom';

import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl =  config.URL;
const DevBoyDetails = ({ devBoy }) => {
    const [editableDevBoy, setEditableDevBoy] = useState({
        ...devBoy,
        status: devBoy.status
    });
    const [editingField, setEditingField] = useState(null);

    const [selectedStatus, setSelectedStatus] = useState('new');
    const navigate = useNavigate(); 
    const token = useAuthToken(); 
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const handleChange = (e) => {
        if (editingField && editingField !== e.target.name) {
            alert('Please update the changed field before editing another field.');
            return;
        }
    
        setEditingField(e.target.name);
        let newValue = e.target.value;
        if (e.target.name === 'status') {
            newValue = e.target.value === 'true' ? 'true' : 'false'; // Ensure the value is always 'true' or 'false' as a string
        }
        setEditableDevBoy({ ...editableDevBoy, [e.target.name]: newValue });
    };
    
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleUpdate = async () => {
        if (!editingField) {
            alert('No changes detected.');
            return;
        }

        const updatedData = {
            ...editableDevBoy,
            [editingField]: editableDevBoy[editingField]
        };

        console.log('Sending update:', updatedData);

        try {
            const response = await axios.put(`${apiUrl}/admin/updateDevBoy`, updatedData, {
                headers,
                params: { attributeName: editingField }
            });
            console.log('Update Successful', response.data);
            alert('DevBoy details updated successfully!');

            const devBoysInStorage = JSON.parse(localStorage.getItem('devBoys')) || [];
            const updatedDevBoysInStorage = devBoysInStorage.map(db => 
                db.uuidDevBoy === editableDevBoy.uuidDevBoy ? updatedData : db
            );
            localStorage.setItem('devBoys', JSON.stringify(updatedDevBoysInStorage));
            setEditingField(null);
        } catch (error) {
            console.error('Error updating DevBoy:', error);
            alert('Failed to update DevBoy details.');
        }
    };

    const handleViewOrders = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/devOrders`, {
                headers: { ...headers, id: editableDevBoy.uuidDevBoy }
              });
            navigate('/order-list-devBoy', { state: { devBoyDetails: editableDevBoy, orders: response.data } });
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to fetch orders.');
        }
    };

    const handleViewOrdersByStatus = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/getOrdersByStatus`, {
                headers: { ...headers, id: editableDevBoy.uuidDevBoy },
                params: { gsiName: 'gsi2', status: selectedStatus }
              });
            navigate('/order-list-devboy', { state: { devBoyDetails: editableDevBoy, orders: response.data } });
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to fetch orders.');
        }
    };
    return (
        <div style={devBoyItemContainerStyle}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editableDevBoy.name}
            onChange={handleChange}
            style={inputFieldStyle} // Corrected
          />
    
          <input
            type="text"
            name="DP"
            placeholder="DP"
            value={editableDevBoy.DP}
            onChange={handleChange}
            style={inputFieldStyle} // Corrected
          />
    
          <input
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type"
            value={editableDevBoy.vehicleType}
            onChange={handleChange}
            style={inputFieldStyle}
          />
    
          <select
            name="status"
            value={editableDevBoy.status === 'true' ? 'true' : 'false'}
            onChange={handleChange}
            style={dropdownFieldStyle} 
            disabled={editingField && editingField !== 'status'}
          >    <option value="true">Active</option>
          <option value="false">Inactive</option>
          </select>
    
          <button onClick={handleUpdate} style={buttonStyle}>
            Update Details
          </button>
    
          <button onClick={handleViewOrders} style={buttonStyle}>
            View Orders
          </button>
    
          <div style={orderStatusDropdownContainerStyle}> 
            <select value={selectedStatus} onChange={handleStatusChange} style={dropdownFieldStyle}> 
            <option value="new">New</option>
                <option value="ip">In Progress</option>
                <option value="pkd">Picked</option>
                <option value="com">Completed</option>
                <option value="can">Cancelled</option>
                <option value="unpkd">Unpicked</option>
                <option value="undel">Undelivered</option>
            </select>
    
            <button onClick={handleViewOrdersByStatus} style={buttonStyle}> 
              Get Orders
            </button>
          </div>
        </div>
      );
    };
    const devBoyItemContainerStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: '10px',
      padding: '10px',
      borderBottom: '1px solid #eee'
    };
  
    const inputFieldStyle = {
      padding: '5px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    };
  
    const buttonStyle = {
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#4CAF50',
      color: 'white'
    };
  
    const orderStatusDropdownContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  
    const dropdownFieldStyle = {
      ...inputFieldStyle,
      marginRight: '5px'
    };
export default DevBoyDetails;
