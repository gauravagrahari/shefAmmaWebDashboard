import React from 'react';
import axios from 'axios';

const DevBoyDetails = ({ devBoy }) => {
    const updateDevBoyDetails = async () => {
        try {
            // Replace with your actual update API endpoint and request body
            const response = await axios.put(`[API_ENDPOINT]/devboys/${devBoy.uuidDevBoy}`, devBoy);
            console.log('Update Successful', response.data);
            // Handle additional actions after successful update
        } catch (error) {
            console.error('Error updating DevBoy', error);
            // Handle error
        }
    };

    return (
        <div className="devboy-details">
            <div>{devBoy.uuidDevBoy}</div>
            <div>{devBoy.name}</div>
            <div>{devBoy.geocode}</div>
            <div>{devBoy.DP}</div>
            <div>{devBoy.locationDevBoy?.address}</div>
            <div>{devBoy.status}</div>
            <div>{devBoy.vehicleType}</div>
            <button onClick={updateDevBoyDetails}>Update</button>
        </div>
    );
};

export default DevBoyDetails;
