import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import OrdersHeader from '../adminSubComponents/OrdersHeader';
import OrderItem from '../adminSubComponents/OrderItem';
import { DevBoyContext } from '../context/DevBoyContext'; // Adjust the path if needed
import '../../index.css'; 

const OrderListDevBoy = () => {
  const location = useLocation();
  const { devBoyDetails, orders } = location.state;
  const { devBoys } = useContext(DevBoyContext);

  return (
    <div className="orderListContainer">
      <div className="devBoyDetailsContainer">
        <h2>DevBoy Details</h2>
        <p>Name: {devBoyDetails.name}</p>
        <p>Geocode: {devBoyDetails.geocode}</p>
        <p>DP: {devBoyDetails.DP}</p>
        <p>Vehicle Type: {devBoyDetails.vehicleType}</p>
        <p>Status: {devBoyDetails.status ? 'Active' : 'Inactive'}</p>
        {/* Add more devBoy details as needed */}
      </div>

      <OrdersHeader />

      <div className="ordersContainer">
        {orders.map(order => (
          <OrderItem key={order.uuidOrder} order={order} devBoys={devBoys} />
        ))}
      </div>
    </div>
  );
};

export default OrderListDevBoy;
