import React from 'react';
import axios from 'axios';
import '../../index.css'; 
import { useNavigate } from 'react-router-dom';

const DevBoyDetails = ({ devBoy }) => {
    const [editableDevBoy, setEditableDevBoy] = useState({
      ...devBoy,
      status: devBoy.status ? 'Active' : 'Inactive' // Convert boolean to string representation
    });
    const [selectedStatus, setSelectedStatus] = useState('new');
    const navigate = useNavigate(); // use useNavigate hook
    const apiUrl = process.env.REACT_APP_API_URL;

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
            const response = await axios.get(`http://your-api-url/admin/devOrders`, {
                headers: { id: editableDevBoy.uuidDevBoy }
            });
            navigate('/order-list-devBoy', { devBoyDetails: editableDevBoy, orders: response.data });
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to fetch orders.');
        }
    };

    const handleViewOrdersByStatus = async () => {
        try {
            const response = await axios.get(`http://your-api-url/admin/getOrdersByStatus`, {
                headers: { id: editableDevBoy.uuidDevBoy },
                params: { gsiName: 'gsi2', status: selectedStatus }
            });
            navigate('/order-list-devboy', { devBoyDetails: editableDevBoy, orders: response.data });
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to fetch orders.');
        }
    };
    return (
        <div style={styles.devBoyItemContainer}>
         <input
                type="text"
                name="name"
                placeholder="Name"
                value={editableDevBoy.name}
                onChange={handleChange}
                style={styles.inputField}
            />
            <input
                type="text"
                name="geocode"
                placeholder="Geocode"
                value={editableDevBoy.geocode}
                onChange={handleChange}
                style={styles.inputField}
            />
            <input
                type="text"
                name="DP"
                placeholder="DP"
                value={editableDevBoy.DP}
                onChange={handleChange}
                style={styles.inputField}
            />
            <input
                type="text"
                name="vehicleType"
                placeholder="Vehicle Type"
                value={editableDevBoy.vehicleType}
                onChange={handleChange}
                style={styles.inputField}
            />
            <select
                name="status"
                value={editableDevBoy.status}
                onChange={handleChange}
                style={styles.dropdownField}
            >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>

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
