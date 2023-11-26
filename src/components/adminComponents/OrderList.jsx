import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import OrdersHeader from '../adminSubComponents/OrdersHeader';
import OrderItem from '../adminSubComponents/OrderItem';
import '../../index.css'; 
import { HostContext } from '../context/HostContext'; // Adjust the import path as necessary

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { status } = location.state;
    const { hosts } = useContext(HostContext); // Use HostContext
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchOrdersByStatus = async () => {
            try {
                const hostIds = hosts.map(host => host.uuidHost); // Extract host IDs
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/getOrdersByStatus`, {
                    params: { ids: hostIds, gsiName: 'gsi1', status }
                });
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        if (hosts.length > 0) {
            fetchOrdersByStatus();
        }
    }, [status, hosts]); // Add hosts to dependency array

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <OrdersHeader />
            {orders.map(order => <OrderItem key={order.uuidOrder} orderData={order} />)}
        </div>
    );
};

export default OrderList;
