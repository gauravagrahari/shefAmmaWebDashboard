import React, { useState } from 'react';
import '../../index.css';
import axios from 'axios';
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl =  config.URL;
const OrderItem = ({ orderData, devBoys, onDevBoyAssigned }) => {
    const [selectedDevBoy, setSelectedDevBoy] = useState(orderData.uuidDevBoy || '');
    const [selectedStatus, setSelectedStatus] = useState(orderData.status);
    const [lastEditedAttribute, setLastEditedAttribute] = useState(null);
    const address = orderData.delAddress || {};
    const { street, houseName, city, state, pinCode } = address;
    const token = useAuthToken(); 

    const handleDevBoyChange = (event) => {
        setSelectedDevBoy(event.target.value);
        setLastEditedAttribute('uuidDevBoy');
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setLastEditedAttribute('status');
    };
    const isOrderNew = orderData.status === 'new';
    const activeDevBoys = isOrderNew ? devBoys.filter(devBoy => devBoy.status === 'true') : devBoys;
//     console.log("All DevBoys:", devBoys);
// console.log("Active DevBoys:", activeDevBoys);
 
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const updateOrder = async () => {
        if (!lastEditedAttribute) {
            alert('No changes detected.');
            return;
        }

        const updatedOrder = {
            ...orderData,
            [lastEditedAttribute]: lastEditedAttribute === 'uuidDevBoy' ? selectedDevBoy : selectedStatus,
        };

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
            const response = await axios.put(`${apiUrl}/admin/updateOrder`, updatedOrder, {
                headers,
                params: { attributeName: lastEditedAttribute }
            });

            if (response.status === 200) {
                onDevBoyAssigned();
                alert('Order updated successfully!');
            }
        } catch (error) {
            console.error('Error updating order', error);
            alert('Failed to update order.');
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
        <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="new">New</option>
                <option value="ip">In Progress</option>
                <option value="pkd">Picked</option>
                <option value="com">Completed</option>
                <option value="can">Cancelled</option>
                <option value="unpkd">Unpicked</option>
                <option value="undel">Undelivered</option>
            </select>
            <select value={selectedDevBoy} onChange={handleDevBoyChange}>
                <option value="">Select Dev Boy</option>
                {devBoys.map(devBoy => (
                    <option key={devBoy.uuidDevBoy} value={devBoy.uuidDevBoy}>{devBoy.name}</option>
                ))}
            </select>
            <button onClick={updateOrder}>Update Dev Boy</button>            
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
