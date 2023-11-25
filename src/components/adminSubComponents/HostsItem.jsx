import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from '../index';

const HostsItem = ({ hostData, onViewOrders }) => {
    const [editableHost, setEditableHost] = useState({
      ...hostData,
      status: hostData.status ? 'Active' : 'Inactive' // Convert boolean to string representation
    });
    const [selectedStatus, setSelectedStatus] = useState('new');
    const history = useHistory();

    const handleChange = (e) => {
      setEditableHost({...editableHost, [e.target.name]: e.target.value});
  };

  const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
  };
    const handleUpdate = async (attributeName) => {
      const updatedHost = {
        ...editableHost,
        status: editableHost.status === 'Active' // Convert string representation back to boolean
      };
  
      try {
        const response = await axios.put('http://your-api-url/admin/updateHost', updatedHost, {
          params: { attributeName }
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
        const response = await axios.get(`http://your-api-url/admin/hostOrders`, {
          headers: { hostID: editableHost.uuidHost }
        });
        console.log('Orders:', response.data);
        history.push('/order-list-host', { hostDetails: editableHost, orders: response.data });
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders.');
      }
    };
    const handleViewOrdersByStatus = async () => {
      try {
          const response = await axios.get(`http://your-api-url/admin/getOrdersByStatus`, {
              headers: { id: editableHost.uuidHost },
              params: { gsiName: 'gsi1', status: selectedStatus }
          });
          console.log('Orders:', response.data);
          history.push('/order-list-host', { hostDetails: editableHost, orders: response.data });
      } catch (error) {
          console.error('Error fetching orders:', error);
          alert('Failed to fetch orders.');
      }
  };

  return (
    <div style={styles.hostItemContainer}>
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
        value={editableHost.status}
        onChange={handleChange}
        style={styles.dropdownField}
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
        style={styles.inputField}
      />
      <input
        type="text"
        name="dineCategory"
        placeholder="Dine Category"
        value={editableHost.dineCategory}
        onChange={handleChange}
        style={styles.inputField}
      />
      <input
        type="text"
        name="DDP"
        placeholder="DDP"
        value={editableHost.DDP}
        onChange={handleChange}
        style={styles.inputField}
      />
      <input
        type="text"
        name="DP"
        placeholder="DP"
        value={editableHost.DP}
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
        name="currentMessage"
        placeholder="Current Message"
        value={editableHost.currentMessage}
        onChange={handleChange}
        style={styles.inputField}
      />
      <input
        type="text"
        name="providedMeals"
        placeholder="Provided Meals"
        value={editableHost.providedMeals}
        onChange={handleChange}
        style={styles.inputField}
      />
      
      <div style={styles.geocodeField}>
        Geocode: {editableHost.geocode}
      </div>
      <div style={styles.ratingField}>
        Rating: {editableHost.ratingHost}
      </div>

      <button onClick={handleUpdate} style={styles.updateButton}>
        Update Details
      </button>
      <button onClick={handleViewOrders} style={styles.viewOrdersButton}>
        View Orders
      </button>
      <div style={styles.orderStatusDropdownContainer}>
                <select value={selectedStatus} onChange={handleStatusChange} style={styles.dropdownField}>
                    <option value="new">New</option>
                    <option value="ip">In Progress</option>
                    <option value="pkd">Packed</option>
                    <option value="com">Completed</option>
                    <option value="can">Cancelled</option>
                    <option value="unpkd">Unpicked</option>
                    <option value="undel">Undelivered</option>
                </select>
                <button onClick={handleViewOrdersByStatus} style={styles.viewOrdersButton}>
                    Get Orders
                </button>
            </div>
    </div>
  );
};

export default HostsItem;
