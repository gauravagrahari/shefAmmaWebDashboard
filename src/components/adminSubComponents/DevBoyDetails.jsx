import React, { useState } from 'react';
import axios from 'axios';
import '../../index.css'; 
import { useNavigate } from 'react-router-dom';

import config from '../context/constants';

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl =  config.URL;
const DevBoyDetails = ({ devBoy }) => {
    const [editableDevBoy, setEditableDevBoy] = useState({
      ...devBoy,
      status: devBoy.status ? 'Active' : 'Inactive' // Convert boolean to string representation
    });
    const [selectedStatus, setSelectedStatus] = useState('new');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setEditableDevBoy({ ...editableDevBoy, [e.target.name]: e.target.value });
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${apiUrl}/admin/updateDevBoy`, editableDevBoy, {
                params: { attributeName: 'status' }
            });
            console.log('Update Successful', response.data);
            alert('DevBoy details updated successfully!');
        } catch (error) {
            console.error('Error updating DevBoy:', error);
            alert('Failed to update DevBoy details.');
        }
    };

    const handleViewOrders = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/devOrders`, {
                headers: { id: editableDevBoy.uuidDevBoy }
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
                headers: { id: editableDevBoy.uuidDevBoy },
                params: { gsiName: 'gsi2', status: selectedStatus }
            });
            navigate('/order-list-devboy', { state: { devBoyDetails: editableDevBoy, orders: response.data } });
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to fetch orders.');
        }
    };
    return (
        <div className="devBoyItemContainer">
         <input
                type="text"
                name="name"
                placeholder="Name"
                value={editableDevBoy.name}
                onChange={handleChange}
                className="inputField"
            />
            <input
                type="text"
                name="geocode"
                placeholder="Geocode"
                value={editableDevBoy.geocode}
                onChange={handleChange}
                className="inputField"
            />
            <input
                type="text"
                name="DP"
                placeholder="DP"
                value={editableDevBoy.DP}
                onChange={handleChange}
                className="inputField"
            />
            <input
                type="text"
                name="vehicleType"
                placeholder="Vehicle Type"
                value={editableDevBoy.vehicleType}
                onChange={handleChange}
                className="inputField"
            />
            <select
                name="status"
                value={editableDevBoy.status}
                onChange={handleChange}
                className="dropdownField"
            >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>

        <button onClick={handleUpdate} className="updateButton">
            Update Details
        </button>
        <button onClick={handleViewOrders} className="viewOrdersButton">
            View Orders
        </button>
        <div className="orderStatusDropdownContainer">
            <select value={selectedStatus} onChange={handleStatusChange} className="dropdownField">
                <option value="new">New</option>
                <option value="ip">In Progress</option>
                <option value="pkd">Packed</option>
                <option value="com">Completed</option>
                <option value="can">Cancelled</option>
                <option value="unpkd">Unpicked</option>
                <option value="undel">Undelivered</option>
            </select>
            <button onClick={handleViewOrdersByStatus} className="viewOrdersButton">
                Get Orders
            </button>
        </div>
    </div>
        // <div className="devboy-details">
        //     <div>{devBoy.uuidDevBoy}</div>
        //     <div>{devBoy.name}</div>
        //     <div>{devBoy.geocode}</div>
        //     <div>{devBoy.DP}</div>
        //     <div>{devBoy.locationDevBoy?.address}</div>
        //     <div>{devBoy.status}</div>
        //     <div>{devBoy.vehicleType}</div>
        //     <button onClick={updateDevBoyDetails}>Update</button>
        // </div>
    );
};

export default DevBoyDetails;
