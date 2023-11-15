import React, { useState } from 'react';
import '../../index.css';

    const OrderItem = ({ orderData, devBoys }) => {
    const [selectedDevBoy, setSelectedDevBoy] = useState(orderData.uuidDevBoy || '');

    const handleDevBoyChange = (event) => {
        setSelectedDevBoy(event.target.value);
    };

    const updateDevBoy = async () => {
        try {
            const response = await axios.put(`[API_ENDPOINT]/orders/${orderData.uuidOrder}`, {
                uuidDevBoy: selectedDevBoy
            });
            console.log('Update Successful', response.data);
            // Handle any additional actions after update
        } catch (error) {
            console.error('Error updating order', error);
            // Handle error
        }
    }
    return (
        <div className="order-item">
            <div>{orderData.uuidOrder}</div>
            <div>{orderData.timeStamp}</div>
            <div>{orderData.status}</div>
            <select value={selectedDevBoy} onChange={handleDevBoyChange}>
                <option value="">Select Dev Boy</option>
                {devBoys.map((devBoy) => (
                    <option key={devBoy.uuid} value={devBoy.uuid}>{devBoy.name}</option>
                ))}
            </select>
            <button onClick={updateDevBoy}>Update Dev Boy</button>            
            <div>{orderData.amount}</div>
            <div>{orderData.noOfServing}</div>
            <div>{orderData.nameGuest}</div>
            <div>{orderData.geoGuest}</div>
            <div>{orderData.nameHost}</div>
            <div>{orderData.phoneGuest}</div>
            <div>{orderData.phoneHost}</div>
            <div>{orderData.geoHost}</div>
            <div>{orderData.uuidHost}</div>
            <div>{orderData.mealType}</div>
            <div>{orderData.itemName}</div>
            <div>{orderData.itemPrice}</div>
            <div>{orderData.delTimeAndDay}</div>
            <div>{orderData.delAddress}</div>
          
        </div>
    );
};

export default OrderItem;
