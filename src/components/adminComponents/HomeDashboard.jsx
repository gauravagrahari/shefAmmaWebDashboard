import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const HomeDashboard = () => {
    const [selectedStatus, setSelectedStatus] = useState('new');
    const navigate = useNavigate(); // use useNavigate hook

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value); 
    };

    const navigateToOrderList = () => {
        navigate('/order-list', { state: { status: selectedStatus } });
    };

    const navigateToDevBoyList = () => {
        navigate('/devboy-list');
    };

    const navigateToHostsList = () => {
        navigate('/hosts-list');
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <select value={selectedStatus} onChange={handleStatusChange}>
                    <option value="new">New</option>
                    <option value="ip">In Progress</option>
                    <option value="pkd">Packed</option>
                    <option value="com">Completed</option>
                    <option value="can">Cancelled</option>
                    <option value="unpkd">Unpicked</option>
                    <option value="undel">Undelivered</option>
                </select>
                <button onClick={navigateToOrderList}>Get the Orders</button>
            </div>
            <button onClick={navigateToDevBoyList}>View DevBoys</button>
            <button onClick={navigateToHostsList}>View Cooks</button>
        </div>
    );
};

export default HomeDashboard;
