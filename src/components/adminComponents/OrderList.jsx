import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import OrdersHeader from '../adminSubComponents/OrdersHeader';
import OrderItem from '../adminSubComponents/OrderItem';
import '../../index.css'; 
import { HostContext } from '../context/HostContext';
import { DevBoyContext } from '../context/DevBoyContext';
import config from '../context/constants';

const apiUrl = config.URL;

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [mealTypeFilter, setMealTypeFilter] = useState('all');
    const [isDescending, setIsDescending] = useState(true);
    const { status } = useLocation().state;
    const { hosts } = useContext(HostContext);
    const { devBoys } = useContext(DevBoyContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrdersByStatus = async () => {
        try {
            const hostIds = hosts.map(host => encodeURIComponent(host.uuidHost));
            const encodedHostIds = hostIds.join('&ids=');
            const queryString = `ids=${encodedHostIds}&gsiName=gsi1&status=${encodeURIComponent(status)}`;
            const fullUrl = `${apiUrl}/admin/getAllOrdersByStatus?${queryString}`;
            const response = await axios.get(fullUrl);
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hosts.length > 0) {
            fetchOrdersByStatus();
        }
    }, [status, hosts]);

    useEffect(() => {
        let updatedOrders = [...orders];

        if (mealTypeFilter !== 'all') {
            updatedOrders = updatedOrders.filter(order => order.mealType === mealTypeFilter);
        }

        updatedOrders.sort((a, b) => isDescending 
            ? new Date(b.timeStamp) - new Date(a.timeStamp) 
            : new Date(a.timeStamp) - new Date(b.timeStamp));

        setFilteredOrders(updatedOrders);
    }, [orders, mealTypeFilter, isDescending]);

    if (error) return <div>Error: {error.message}</div>;
    if (loading) return <div>Loading...</div>;

    return (
        <div>
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
            {filteredOrders.map(order => (
                <OrderItem key={`${order.uuidOrder}-${order.timeStamp}`} orderData={order} devBoys={devBoys} />
            ))}
        </div>
    );
};

export default OrderList;
