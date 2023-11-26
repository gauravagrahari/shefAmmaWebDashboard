import React, { useState } from 'react';
import '../../index.css';
import axios from 'axios';
import config from '../context/constants';

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl =  config.URL;
    const OrderItem = ({ orderData, devBoys }) => {
    const [selectedDevBoy, setSelectedDevBoy] = useState(orderData.uuidDevBoy || '');
    const address = orderData.delAddress || {};
    const { street, houseName, city, state, pinCode } = address;

    const handleDevBoyChange = (event) => {
        setSelectedDevBoy(event.target.value);
    };
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const updateDevBoy = async () => {
        try {
            const updatedOrder = {
                ...orderData, // Spread the existing order data
                uuidDevBoy: selectedDevBoy, // Update only the uuidDevBoy field
                timeStamp:orderData.timeStamp,
            
            };
    
            // Make the PUT request to the server
            const response = await axios.put(`${apiUrl}/admin/updateOrder`, updatedOrder, {
                params: {
                    attributeName: 'uuidDevBoy' // Specify the attribute name being updated
                }
            });
    
            console.log('Update Successful', response.data);
            alert('DevBoy updated successfully!');
        } catch (error) {
            console.error('Error updating DevBoy for order', error);
            alert('Failed to update DevBoy.');
        }
    };
    const getMealTypeName = (mealType) => {
        const mealTypes = { b: 'Breakfast', l: 'Lunch', d: 'Dinner' };
        return mealTypes[mealType] || 'Unknown';
    };

    return (
        <div className="order-item">
            {/* <div>{orderData.uuidOrder}</div> */}
            <div>{formatTime(orderData.timeStamp)}</div>
            <div>{orderData.status}</div>
            <select value={selectedDevBoy} onChange={handleDevBoyChange}>
        <option value="">Select Dev Boy</option>
        {devBoys.map(devBoy => (
          <option key={devBoy.uuidDevBoy} value={devBoy.uuidDevBoy}>{devBoy.name}</option>
        ))}
      </select>
            <button onClick={updateDevBoy}>Update Dev Boy</button>            
            <div>{orderData.amount}</div>
            <div>{orderData.noOfServing}</div>
            <div>{orderData.nameGuest}</div>
            {/* <div>{orderData.geoGuest}</div> */}
            <div>{orderData.nameHost}</div>
            <div>{orderData.phoneGuest}</div>
            <div>{orderData.phoneHost}</div>
            {/* <div>{orderData.geoHost}</div> */}
            <div>{orderData.uuidHost}</div>
            <div>{getMealTypeName(orderData.mealType)}</div>
            <div>{orderData.itemName}</div>
            <div>{orderData.itemPrice}</div>
            <div>{orderData.delTimeAndDay}</div>
            {/* <div>{orderData.delAddress}</div> */}
 {orderData.delAddress ? (
                <div>
                    <div>Street: {street}</div>
                    <div>House Name: {houseName}</div>
                    <div>City: {city}</div>
                    <div>State: {state}</div>
                    <div>Pin Code: {pinCode}</div>
                </div>
            ) : (
                <div>No address provided</div>
            )}
        </div>
    );
};

export default OrderItem;
