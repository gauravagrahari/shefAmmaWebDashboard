import React from 'react';

const OrdersHeader = () => {

    return (
        <div className="orders-header" style={ordersHeaderStyle}>
            <div>Timestamp</div>
            <div>Status</div>
            <div>Final Amt.</div>
            <div>Servings</div>
            <div>Cust Name</div>
            <div>Cook Name</div>
            <div>Cust Phone</div>
            <div>Cook Phone</div>
            <div>Meal Type</div>
            <div>Item Name</div>
            <div>Cook's Price</div>
            <div>Delivery Time</div>
            <div>Delivery Address</div>
            <div>Cook Address</div>
            <div>Preferred Time</div>
            <div>Cutlery count</div>
            <div>Rating</div>
            <div>Review</div>
        </div>
    );
};
const ordersHeaderStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(18, minmax(120px, 1fr))', // Adjust the number of columns to match OrderItem
    gap: '10px',
    backgroundColor: '#fff',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '2px solid #ccc'
};

export default OrdersHeader;
