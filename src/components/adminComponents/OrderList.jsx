import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import OrdersHeader from '../adminSubComponents/OrdersHeader';
import OrderItem from '../adminSubComponents/OrderItem';
import config from '../context/constants';
import { OrderListContext } from '../context/OrderListContext';
import useAuthToken from '../context/useAuthToken';
import {buildHostAddressMap} from '../commonMethods/hostAddressMap';

const apiUrl = config.URL;

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [mealTypeFilter, setMealTypeFilter] = useState('all');
    const [isDescending, setIsDescending] = useState(true);
    const { status } = useLocation().state;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalOrders, setTotalOrders] = useState(0);
    const [ordersWithoutDevBoy, setOrdersWithoutDevBoy] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const token = useAuthToken(); 

    
    console.log("------fsfsavavaf-->"+token);
    const devBoys = JSON.parse(localStorage.getItem('devBoys')) || [];
    const hosts = JSON.parse(localStorage.getItem('hosts')) || [];
    const hostAddressMap = buildHostAddressMap(hosts);
    useEffect(() => {
      
    
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
        const fetchOrdersByStatus = async () => {
          try {
            const storedHosts = JSON.parse(localStorage.getItem('hosts')) || [];
            if (storedHosts.length > 0) {
                    const hostIds = storedHosts.map(host => encodeURIComponent(host.uuidHost));
                    const encodedHostIds = hostIds.join('&ids=');
                    const queryString = `ids=${encodedHostIds}&gsiName=gsi1&status=${encodeURIComponent(status)}`;
                    const fullUrl = `${apiUrl}/admin/getAllOrdersByStatus?${queryString}`;
                    const response = await axios.get(fullUrl, { headers: headers});
                    setOrders(response.data);
                } else {
                    alert('Please fetch Hosts data from the server.');
                }
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
            fetchOrdersByStatus();

    }, []);

    
    useEffect(() => {
        const hosts = JSON.parse(localStorage.getItem('hosts')) || [];
        const updatedOrders = orders.filter(order => mealTypeFilter === 'all' || order.mealType === mealTypeFilter)
                                   .sort((a, b) => isDescending ? new Date(b.timeStamp) - new Date(a.timeStamp) 
                                                                : new Date(a.timeStamp) - new Date(b.timeStamp));
        setFilteredOrders(updatedOrders);
        setTotalOrders(updatedOrders.length);
        setOrdersWithoutDevBoy(updatedOrders.filter(order => !order.uuidDevBoy).length);
        setTotalPrice(updatedOrders.reduce((sum, order) => sum + (parseFloat(order.amount) || 0), 0));
    }, [orders, mealTypeFilter, isDescending]);

    const handleDevBoyAssignment = () => {
        setOrdersWithoutDevBoy(filteredOrders.filter(order => !order.uuidDevBoy).length);
    };

    if (error) return <div>Error: {error.message}</div>;
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="order-controls" style={orderControlsStyle}>
                <button onClick={() => setIsDescending(!isDescending)}>Toggle Order</button>
                <select onChange={(e) => setMealTypeFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="b">Breakfast</option>
                    <option value="l">Lunch</option>
                    <option value="d">Dinner</option>
                </select>
                <p>Total Orders: {totalOrders}</p>
                <p>Orders without DevBoy: {ordersWithoutDevBoy}</p>
                <p>Total Price: {totalPrice.toFixed(2)}</p>
            </div >
            <div className="order-list" style={orderListStyle}>
            <OrdersHeader />
            {filteredOrders.map(order => (
                <OrderItem key={`${order.uuidOrder}-${order.timeStamp}`} orderData={order} devBoys={devBoys} onDevBoyAssigned={handleDevBoyAssignment} hostAddress={hostAddressMap[order.uuidHost]}/>
            ))}
                </div>
        </div>
    );
};
const orderListStyle = {
    margin: '10px'
};

const orderControlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#fafafa',
    borderBottom: '2px solid #ddd'
};

export default OrderList;
