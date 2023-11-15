import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrdersHeader from '../adminSubComponents/OrdersHeader.jsx';
import OrderItem from '../adminSubComponents/OrderItem';
import '../../index.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [devBoy, setDevBoy] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchDevBoys=async () => {
            try{
                const response=await axios.get(``);
                setDevBoy(response.data);
            }
            catch(error){
                console.error('Error updating order', error);
            }
        }
        fetchDevBoys
    },[]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <OrdersHeader />
            <OrderItem orderData={orders} devBoys={devBoy}/>
        </div>
    );
};

export default OrderList;
