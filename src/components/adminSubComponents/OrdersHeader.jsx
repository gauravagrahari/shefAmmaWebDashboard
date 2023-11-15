import React from 'react';
import '../../index.css';

const OrdersHeader = () => {
    return (
        <div className="orders-header">
            <div>Order ID</div>
            <div>Timestamp</div>
            <div>Status</div>
            <div>Amount</div>
            <div>Servings</div>
            <div>Guest Name</div>
            <div>Guest Location</div>
            <div>Host Name</div>
            <div>Guest Phone</div>
            <div>Host Phone</div>
            <div>Host Location</div>
            <div>Host ID</div>
            <div>Meal Type</div>
            <div>Item Name</div>
            <div>Item Price</div>
            <div>Delivery Time</div>
            <div>Delivery Address</div>
        </div>
    );
};

export default OrdersHeader;
