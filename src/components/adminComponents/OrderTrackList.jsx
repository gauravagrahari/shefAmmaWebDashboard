import React, { useState } from 'react';
import axios from 'axios';
import config from '../context/constants';
import OrderTrackDisplay from '../adminSubComponents/OrderTrackDisplay';
import useAuthToken from '../context/useAuthToken';

const apiUrl = config.URL;

const OrderTrackList = () => {
    const [orderTracks, setOrderTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = useAuthToken();

    const hosts = JSON.parse(localStorage.getItem('hosts')) || [];
    const fetchOrderTracks = async (mealType) => {
        setIsLoading(true);
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        try {
            const response = await axios.get(`${apiUrl}/admin/getAllMealOrderTrack?mealType=${mealType}`, { headers });
            setOrderTracks(response.data);
        } catch (error) {
            console.error('Error fetching order tracks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Order Track Dashboard</h2>
            <div>
                <button onClick={() => fetchOrderTracks('l')}>Lunch</button>
                <button onClick={() => fetchOrderTracks('d')}>Dinner</button>
                <button onClick={() => fetchOrderTracks('b')}>Breakfast</button>
            </div>
            {isLoading ? <p>Loading...</p> : <OrderTrackDisplay orderTracks={orderTracks} hosts={hosts} />}
        </div>
    );
};

export default OrderTrackList;
