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
        <div style={styles.container}>
            <h2 style={styles.header}>Order Track Dashboard</h2>
            <div>
                <button style={styles.button} onClick={() => fetchOrderTracks('l')}>Lunch</button>
                <button style={styles.button} onClick={() => fetchOrderTracks('d')}>Dinner</button>
                <button style={styles.button} onClick={() => fetchOrderTracks('b')}>Breakfast</button>
            </div>
            {isLoading ? <p style={styles.loadingText}>Loading...</p> : <OrderTrackDisplay orderTracks={orderTracks} hosts={hosts} />}
        </div>
    );
};
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f3f3f3',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    header: {
        color: '#333',
        marginBottom: '15px'
    },
    button: {
        marginRight: '10px',
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    loadingText: {
        color: '#666'
    }
};
export default OrderTrackList;
