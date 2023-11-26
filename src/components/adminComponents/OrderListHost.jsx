import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import OrdersHeader from '../adminSubComponents/OrdersHeader';
import OrderItem from '../adminSubComponents/OrderItem';
import { DevBoyContext } from '../context/DevBoyContext'; 
import '../../index.css';

const OrderListHost = () => {
  const location = useLocation();
  const { hostDetails, orders } = location.state;
  const { devBoys } = useContext(DevBoyContext);

  return (
    <div className="orderListHostContainer">
      <div className="hostDetailsContainer">
        <h2>Host Details</h2>
        <p>Name: {hostDetails.nameHost}</p>
        <p>Phone: {hostDetails.phone}</p>
        <p>Geocode: {hostDetails.geocode}</p>
        <p>Dine Category: {hostDetails.dineCategory}</p>
        <p>DDP: {hostDetails.DDP}</p>
        <p>DP: {hostDetails.DP}</p>
        <p>Description: {hostDetails.descriptionHost}</p>
        <p>Current Message: {hostDetails.currentMessage}</p>
        <p>Status: {hostDetails.status ? 'Active' : 'Inactive'}</p>-
        <p>Rating: {hostDetails.ratingHost}</p>
        <p>Number of Ratings: {hostDetails.noOfRating}</p>
        <p>Provided Meals: {hostDetails.providedMeals}</p>
        {/* Add more host details as needed */}
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

export default OrderListHost;