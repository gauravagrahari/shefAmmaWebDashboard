import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import OrdersHeader from '../adminSubComponents/OrdersHeader';
import OrderItem from '../adminSubComponents/OrderItem';
import { DevBoyContext } from '../context/DevBoyContext';
import '../../index.css';
import {buildHostAddressMap} from '../commonMethods/hostAddressMap';

const OrderListDevBoy = () => {
  const location = useLocation();
  const { devBoyDetails, orders: initialOrders = [] } = location.state || {};
  const { devBoys } = useContext(DevBoyContext);

  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [mealTypeFilter, setMealTypeFilter] = useState('all');
  const [isDescending, setIsDescending] = useState(true);
  
  const hosts = JSON.parse(localStorage.getItem('hosts')) || [];
  const hostAddressMap = buildHostAddressMap(hosts);
  useEffect(() => {
    const updatedOrders = orders
      .filter(order => mealTypeFilter === 'all' || order.mealType === mealTypeFilter)
      .sort((a, b) => isDescending ? new Date(b.timeStamp) - new Date(a.timeStamp) 
                                   : new Date(a.timeStamp) - new Date(b.timeStamp));
    setFilteredOrders(updatedOrders);
  }, [orders, mealTypeFilter, isDescending]);

  return (
    <div className="orderListContainer">
     <div>dev boy List</div>
      <div className="devBoyDetailsContainer">
        {/* DevBoy details here */}
      </div>

      {/* Orders Header with filters */}
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

      {/* Orders Container */}
      <div className="ordersContainer">
        {filteredOrders.map(order => (
          <OrderItem key={`${order.uuidOrder}-${order.timeStamp}`} orderData={order} devBoys={devBoys} hostAddress={hostAddressMap[order.uuidHost]}/>
        ))}
      </div>
    </div>
  );
};

export default OrderListDevBoy;
