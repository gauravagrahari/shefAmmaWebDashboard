import React, { useState } from 'react';
import axios from 'axios';
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

const apiUrl = config.URL;

function PincodeComponent() {
    const [pincode, setPincode] = useState('');
    const [message, setMessage] = useState('');
    const [pincodes, setPincodes] = useState([]);

    const token = useAuthToken(); // Retrieve the token
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const addPincode = async () => {
        const pincodeEntity = {
            pk: "pin",
            pincode: pincode,
            status: true
        };
    
        try {
            const response = await axios.post(`${apiUrl}/admin/addPincode`, pincodeEntity, { headers });
            // Check if response.data is an object, and convert it to string if needed
            if (typeof response.data === 'object') {
                setMessage(JSON.stringify(response.data));
            } else {
                setMessage(response.data);
            }
        } catch (error) {
            setMessage(error.response && error.response.data ? JSON.stringify(error.response.data) : "An error occurred");
        }
    };
    
    const checkServiceAvailability = async () => {
        try {
            const response = await axios.get(`${apiUrl}/guest/checkService`, { headers: { ...headers, pinCode: pincode } });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    const deactivatePincode = async () => {
        try {
            const response = await axios.post(`${apiUrl}/admin/deactivatePincode`, {}, { headers: { ...headers, pin: pincode } });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response && error.response.data ? error.response.data : "An error occurred");
        }
    };    
    

    const getAllPincodes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/getAllPincodes`, { headers });
            setPincodes(response.data);
        } catch (error) {
            setMessage(error.response.data);
        }
    };
    const updatePincodeStatus = async (pin, newStatus) => {
        try {
            const response = await axios.post(`${apiUrl}/admin/updatePincodeStatus`, { pincode: pin, status: newStatus }, { headers });
            setMessage(response.data);
            // Optionally refresh the list of pincodes after updating
            getAllPincodes();
        } catch (error) {
            setMessage(error.response && error.response.data ? error.response.data : "An error occurred");
        }
    };
    return (
        <div>
            <input 
                type="text" 
                value={pincode} 
                onChange={(e) => setPincode(e.target.value)} 
                placeholder="Enter Pincode"
            />
            <button onClick={addPincode}>Add Pincode</button>
            <button onClick={checkServiceAvailability}>Check Service Availability</button>
            <button onClick={deactivatePincode}>Deactivate Pincode</button>
            <button onClick={getAllPincodes}>Get All Pincodes</button>

            <div>{message}</div>

            {pincodes.length > 0 && (
                <div>
                    <h3>Available Pincodes:</h3>
                    <ul>
                    {pincodes.length > 0 && (
                <div>
                    <h3>Available Pincodes:</h3>
                    <ul>
                        {pincodes.map((pc, index) => (
                            <li key={index}>
                                {pc.pincode} | 
                                <select 
                                    value={pc.status}
                                    onChange={(e) => setPincodes(pincodes.map((item, idx) => idx === index ? {...item, status: e.target.value === 'true'} : item))}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                                <button onClick={() => updatePincodeStatus(pc.pincode, pc.status)}>Update Status</button>
                            </li> 
                        ))}
                    </ul>
                </div>
            )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PincodeComponent;