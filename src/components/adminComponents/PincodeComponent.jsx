import React, { useState } from 'react';
import axios from 'axios';
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

const apiUrl = config.URL;

function PincodeComponent() {
    const [pincode, setPincode] = useState('');
    const [message, setMessage] = useState('');
    const [pincodes, setPincodes] = useState([]);

    const token = useAuthToken();
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
        <div style={containerStyle}>
          <div style={topSectionStyle}>
            <input 
              type="text" 
              value={pincode} 
              onChange={(e) => setPincode(e.target.value)} 
              placeholder="Enter Pincode"
              style={inputStyle}
            />
            <button onClick={addPincode} style={buttonStyle}>Add Pincode</button>
            <button onClick={checkServiceAvailability} style={buttonStyle}>Check Service</button>
            <button onClick={deactivatePincode} style={buttonStyle}>Deactivate</button>
            <button onClick={getAllPincodes} style={buttonStyle}>Get All</button>
          </div>
    
          <div style={messageStyle}>{message}</div>
    
          {pincodes.length > 0 && (
            <div style={pincodesContainerStyle}>
              {pincodes.map((pc, index) => (
                <div key={index} style={pincodeItemStyle}>
                  {pc.pincode} | 
                  <select 
                    value={pc.status}
                    onChange={(e) => setPincodes(pincodes.map((item, idx) => idx === index ? {...item, status: e.target.value === 'true'} : item))}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                  <button onClick={() => updatePincodeStatus(pc.pincode, pc.status)} style={buttonStyle}>Update</button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f2f2f2',
        width: '100%',
        margin: 'auto'
      };
    
      const topSectionStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '20px'
      };
    
      const inputStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '200px' // Reduced width
      };

  const buttonStyle = {
    padding: '10px 15px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#DE0075', // Accent color
    color: 'white',
    fontWeight: 'bold'
  };

  const messageStyle = {
    backgroundColor: '#ECF87F', // Highlight color for messages
    padding: '10px',
    borderRadius: '5px',
    margin: '10px 0'
  };

  const pincodesListStyle = {
    textAlign: 'left',
    listStyleType: 'none',
    padding: '0'
  };

  const pincodesContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3-column layout
    gap: '10px',
    maxHeight: '400px',
    overflowY: 'auto' // Scrollable section
  };

  const pincodeItemStyle = {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px'
  };
  const selectStyle = {
    margin: '0 10px'
  };
export default PincodeComponent;