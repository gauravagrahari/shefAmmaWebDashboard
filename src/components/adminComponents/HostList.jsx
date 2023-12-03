import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { HostContext } from '../context/HostContext';
import HostsItem from '../adminSubComponents/HostsItem';
import config from '../context/constants';
import HostsHeader from '../adminSubComponents/HostsHeader';
import useAuthToken from '../context/useAuthToken';

const apiUrl = config.URL;

function HostList() {
  const { hosts, updateHosts } = useContext(HostContext);
  const token = useAuthToken(); 

const refreshHosts = async () => {
  try{
  const response = await axios.post(`${apiUrl}/admin/getAllHosts`);
  updateHosts(response.data);
  localStorage.setItem('hosts', JSON.stringify(response.data));
  console.log("hosts refreshed");
  }catch (err) {
    console.error("Error fetching hosts", err);
  }
};
  useEffect(() => {
    const fetchHosts = async () => {
   
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
      try {
        const response = await axios.post(`${apiUrl}/admin/getAllHosts`, {}, { headers });
        updateHosts(response.data);
        localStorage.setItem('hosts', JSON.stringify(response.data));
      } catch (err) {
        console.error("Error fetching hosts", err);
      }
    };
    
    // Fetch hosts if the context is empty
    if (hosts.length === 0) {
      fetchHosts();
    }
  }, [hosts, updateHosts]);


  return (
    <div>
      <HostsHeader />
      <button onClick={refreshHosts} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Refresh Hosts
      </button>
      {hosts.map((host) => (
        <HostsItem key={host.uuidHost} hostData={host} />
      ))}
    </div>
  );
}

export default HostList;
