import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../index.css'; 
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl =  config.URL;
const HostsItem = ({ hostData, onViewOrders }) => {
    const [editableHost, setEditableHost] = useState({
      ...hostData,
      status: hostData.status ? 'Active' : 'Inactive' // Convert boolean to string representation
    });
    const [selectedStatus, setSelectedStatus] = useState('new');
    const [lastEditedAttribute, setLastEditedAttribute] = useState(null);

    const navigate = useNavigate(); // use useNavigate hook
    const token = useAuthToken(); 
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const handleChange = (e) => {
    setEditableHost({ ...editableHost, [e.target.name]: e.target.value });
    setLastEditedAttribute(e.target.name); // Keep track of the last edited attribute
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
        status: editableHost.status === 'Active' // Convert string representation back to boolean
    };

    try {
        const response = await axios.put(`${apiUrl}/admin/updateHost`, updatedHost, {
            headers,
            params: { attributeName: lastEditedAttribute }
        });
        console.log('Update response:', response.data);
        alert('Details updated successfully!');
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
  return (
    <div className="hostItemContainer">
      <input
        type="text"
        name="nameHost"
        placeholder="Name"
        value={editableHost.nameHost}
        onChange={handleChange}
        className="inputField"
      />
          <select
        name="status"
        value={editableHost.status}
        onChange={handleChange}
        className="dropdownField"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={editableHost.phone}
        onChange={handleChange}
        className="inputField"
      />
      <input
        type="text"
        name="dineCategory"
        placeholder="Dine Category"
        value={editableHost.dineCategory}
        onChange={handleChange}
        className="inputField"
      />
      <input
        type="text"
        name="DDP"
        placeholder="DDP"
        value={editableHost.DDP}
        onChange={handleChange}
        className="inputField"
      />
      <input
        type="text"
        name="DP"
        placeholder="DP"
        value={editableHost.DP}
        onChange={handleChange}
        className="inputField"
      />
      <textarea
        name="descriptionHost"
        placeholder="Description"
        value={editableHost.descriptionHost}
        onChange={handleChange}
        className="textArea"
      />
      <input
        type="text"
        name="currentMessage"
        placeholder="Current Message"
        value={editableHost.currentMessage}
        onChange={handleChange}
        className="inputField"
      />
      <input
        type="text"
        name="providedMeals"
        placeholder="Provided Meals"
        value={editableHost.providedMeals}
        onChange={handleChange}
        className="inputField"
      />
      
      <div className="geocodeField">
        Geocode: {editableHost.geocode}
      </div>
      <div className="ratingField">
        Rating: {editableHost.ratingHost}
      </div>

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
                <button onClick={handleViewMeals} className="viewMealsButton">
                Get Meals
            </button>
            </div>
    </div>
  );
};

export default HostsItem;
