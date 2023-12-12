import React, { useContext, useEffect } from 'react';
import DevBoyHeader from '../adminSubComponents/DevBoyHeader';
import DevBoyDetails from '../adminSubComponents/DevBoyDetails';
import axios from 'axios';
import { DevBoyContext } from '../context/DevBoyContext';
import config from '../context/constants';
import useAuthToken from '../context/useAuthToken';

const apiUrl = config.URL;

const DevBoyList = () => {
  const token = useAuthToken(); 
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const { devBoys, updateDevBoys } = useContext(DevBoyContext);

  const refreshDevBoys = async () => {
    try{
    const response = await axios.post(`${apiUrl}/admin/getAllDevBoys`,{},headers);
    updateDevBoys(response.data);
    localStorage.setItem('devBoys', JSON.stringify(response.data));
    console.log("devBoys refreshed");
  }catch (err) {
    console.error("Error fetching hosts", err);
  }
  };
  useEffect(() => {
// Add token to axios request headers
const fetchDevBoys = async () => {


  try {
    const response = await axios.post(`${apiUrl}/admin/getAllDevBoys`, {}, { headers });
    updateDevBoys(response.data);
    localStorage.setItem('devBoys', JSON.stringify(response.data));
  } catch (err) {
    console.error("Error fetching devBoys", err);
  }
};


    fetchDevBoys();
  }, [devBoys, updateDevBoys]); // Dependency array includes devBoys and updateDevBoys

return (
  <div>
    <DevBoyHeader />
    <button onClick={refreshDevBoys} style={{ position: 'absolute', top: '10px', right: '10px' }}>
      Refresh DevBoys
    </button>
    {devBoys.map((devBoy) => (
      <DevBoyDetails key={devBoy.uuidDevBoy} devBoy={devBoy} />
    ))}
  </div>
);
};

export default DevBoyList;