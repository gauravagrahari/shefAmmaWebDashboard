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
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const refreshHosts = async () => {
    try {
        const response = await axios.post(`${apiUrl}/admin/getAllHosts`, {}, { headers });
        if (response.data && Array.isArray(response.data)) {
            updateHosts(response.data);
            localStorage.setItem('hosts', JSON.stringify(response.data));
            console.log("hosts refreshed");
        } else {
            console.error("Received data is not an array", response.data);
        }
    } catch (err) {
        console.error("Error fetching hosts", err);
    }
};
useEffect(() => {
  const fetchHosts = async () => {
    try {
      const response = await axios.post(`${apiUrl}/admin/getAllHosts`, {}, { headers });
      updateHosts(response.data);
      localStorage.setItem('hosts', JSON.stringify(response.data));
    } catch (err) {
      console.error("Error fetching hosts", err);
    }
  };

  const storedHosts = localStorage.getItem('hosts');
  if (storedHosts) {
    updateHosts(JSON.parse(storedHosts));
  } else if (hosts.length === 0) {
  fetchHosts();
  }
}, []); 

const handleHostUpdated = (updatedHost) => {
  const newHosts = hosts.map(host => 
      host.uuidHost === updatedHost.uuidHost ? updatedHost : host
  );
  updateHosts(newHosts);
  localStorage.setItem('hosts', JSON.stringify(newHosts));
};

const styles = {
  container: {
      position: 'relative',
      padding: '20px'
  },
  refreshButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
  }
};

return (
  <div style={styles.container}>
      <HostsHeader />
      <button onClick={refreshHosts} style={styles.refreshButton}>
          Refresh Hosts
      </button>
      {hosts && Array.isArray(hosts) && hosts.map((host) => (
          <HostsItem key={host.uuidHost} hostData={host} onHostUpdated={handleHostUpdated} />
      ))}
  </div>
);
};

export default HostList;
