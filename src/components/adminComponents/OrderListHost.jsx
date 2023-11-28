import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrdersHeader from '../adminSubComponents/OrdersHeader';
import OrderItem from '../adminSubComponents/OrderItem';
import { DevBoyContext } from '../context/DevBoyContext'; 
import '../../index.css';

const OrderListHost = () => {
  const location = useLocation();
  const { hostDetails, orders: initialOrders } = location.state;
  const { devBoys } = useContext(DevBoyContext);
  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [mealTypeFilter, setMealTypeFilter] = useState('all');
  const [isDescending, setIsDescending] = useState(true);

  useEffect(() => {
    const updatedOrders = orders
      .filter(order => mealTypeFilter === 'all' || order.mealType === mealTypeFilter)
      .sort((a, b) => isDescending ? new Date(b.timeStamp) - new Date(a.timeStamp) 
                                   : new Date(a.timeStamp) - new Date(b.timeStamp));
    setFilteredOrders(updatedOrders);
  }, [orders, mealTypeFilter, isDescending]);
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
      <div>
        <button onClick={() => setIsDescending(!isDescending)}>Toggle Order</button>
        <select onChange={(e) => setMealTypeFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="b">Breakfast</option>
          <option value="l">Lunch</option>
          <option value="d">Dinner</option>
        </select>
      </div>
      <div className="ordersContainer">
        {filteredOrders.map(order => (
          <OrderItem key={`${order.uuidOrder}-${order.timeStamp}`} orderData={order} devBoys={devBoys} />
        ))}
      </div>
    </div>
  );
};

export default OrderListHost;