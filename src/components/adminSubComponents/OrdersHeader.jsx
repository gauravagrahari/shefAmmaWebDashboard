import React from 'react';

const OrdersHeader = () => {

    return (
        <div className="orders-header" style={ordersHeaderStyle}>
            <div>Timestamp</div>
            <div>Status</div>
            <div>Amount</div>
            <div>Servings</div>
            <div>Guest Name</div>
            <div>Host Name</div>
            <div>Guest Phone</div>
            <div>Host Phone</div>
            <div>Meal Type</div>
            <div>Item Name</div>
            <div>Item Price</div>
            <div>Delivery Time</div>
            <div>Delivery Address</div>
            <div>Host Address</div>
        </div>
    );
};
const ordersHeaderStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(15, minmax(120px, 1fr))', // Adjust the number of columns to match OrderItem
    gap: '10px',
    backgroundColor: '#fff',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '2px solid #ccc'
};

export default OrdersHeader;
