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
        navigate('/devBoy-list');
    };

    const navigateToHostsList = () => {
        navigate('/hosts-list');
    };
    const navigateToConstants = () => {
        navigate('/constants');
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token'); // Assuming token is stored in local storage
        navigate('/admin-login'); // Replace '/login' with the path to your login route
    };
const navigateToPincodeManager=()=>{
    navigate('/pincode-manager');
}
const navigateToOrderTracking=()=>{
    navigate('/order-track');
}

return (
    <div style={dashboardStyle}>
        <h1 style={headerStyle}>Admin Dashboard</h1>
        <div style={controlsContainerStyle}>
            <select value={selectedStatus} onChange={handleStatusChange} style={selectStyle}>
                <option value="new">New</option>
                    <option value="ip">In Progress</option>
                    <option value="pkd">Picked</option>
                    <option value="com">Completed</option>
                    <option value="can">Cancelled</option>
                    <option value="unpkd">Unpicked</option>
                    <option value="undel">Undelivered</option>
                    </select>
                <button onClick={navigateToOrderList} style={buttonStyle}>Get the Orders</button>
            </div>
            <button onClick={navigateToDevBoyList} style={buttonStyle}>View DevBoys</button>
            <button onClick={navigateToHostsList} style={buttonStyle}>View Cooks</button>
            <button onClick={navigateToConstants} style={buttonStyle}>Constant Charges</button>
            <button onClick={navigateToPincodeManager} style={buttonStyle}>Pincodes</button>
            <button onClick={navigateToOrderTracking} style={buttonStyle}>Track no Of orders</button>
            <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        </div>
    );
};
const dashboardStyle = {
    padding: '20px',
    textAlign: 'center'
};

const headerStyle = {
    color: '#333',
    marginBottom: '20px'
};

const controlsContainerStyle = {
    marginBottom: '20px'
};

const buttonStyle = {
    padding: '10px 15px',
    margin: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold'
};

const selectStyle = {
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer'
};
export default HomeDashboard;
