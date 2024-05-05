import React, { useState } from 'react';
import '../../index.css';
import axios from 'axios';
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

const apiUrl =  config.URL;
const OrderItem = ({ orderData, devBoys, onDevBoyAssigned, hostAddress }) => {
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
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleString([], {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
        });
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
        <div className="order-item" style={orderItemStyle}>
        <div>{formatTime(orderData.timeStamp)}</div>
        <div style={verticalContainerStyle}>

        <select value={selectedStatus} onChange={handleStatusChange} style={selectButtonStyle}>
                <option value="new">New</option>
                <option value="ip">In Progress</option>
                <option value="pkd">Picked</option>
                <option value="com">Completed</option>
                <option value="can">Cancelled</option>
                <option value="unpkd">Unpicked</option>
                <option value="undel">Undelivered</option>
            </select>
            <select value={selectedDevBoy} onChange={handleDevBoyChange} style={selectButtonStyle}>
                <option value="">Select DevBoy</option>
                {devBoys.map(devBoy => (
                    <option key={devBoy.uuidDevBoy} value={devBoy.uuidDevBoy}>{devBoy.name}</option>
                ))}
            </select>
            <button onClick={updateOrder} style={selectButtonStyle}>Update Dev Boy</button>            
            </div>
            <div>{orderData.amount}</div>
            <div>{orderData.noOfServing}</div>
            <div>{orderData.nameGuest}</div>
            <div>{orderData.nameHost}</div>
            <div>{orderData.phoneGuest}</div>
            <div>{orderData.phoneHost}</div>
            <div>{getMealTypeName(orderData.mealType)}</div>
            <div>{orderData.itemName}</div>
            <div>{orderData.itemPrice}</div>
            <div>{orderData.delTimeAndDay}</div>
            {/* <div>{orderData.delAddress}</div> */}
            {orderData.delAddress ? (
                <div>
                    <div> {street}, </div>
                    <div>{houseName}, </div>
                    <div>{city}, </div>
                    <div>{state}, </div>
                    <div>{pinCode}</div>
                </div>
            ) : (
                <div>No address provided</div>
            )}
             <div>{hostAddress ? (
        <div>
          <div>{hostAddress.street}, </div>
          <div>{hostAddress.houseName}, </div>
          <div>{hostAddress.city}, </div>
          <div>{hostAddress.pinCode}, </div>
        </div>
      ) : (
        <div>No host address provided</div>
      )}

    </div>
    <div>{orderData.preferredTime}</div>
    <div>{orderData.cutleryCount}</div>
    <div>{orderData.rating}</div>
    <div>{orderData.review}</div>
    </div>
    );
};
const orderItemStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(18, minmax(120px, 1fr))', 
    gap: '10px',
    padding: '10px',
    borderBottom: '1px solid #eee'
};

const selectButtonStyle = {
    padding: '5px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer'
};

const verticalContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
};
export default OrderItem;
