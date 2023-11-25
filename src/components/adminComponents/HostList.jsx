import React, { useState, useEffect } from "react";
import axios from "axios";
import HostsItem from "../adminSubComponents/HostsItem";

function HostList() {
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.post('/admin/getAllHosts');
        setHosts(response.data);
      } catch (err) {
        console.error("Error fetching hosts", err);
      }
    };

    fetchHosts();
  }, []);

  return (
    <div>
      <h1>Hosts List</h1>
      {hosts.map((host) => (
        <HostsItem key={host.uuidHost} hostData={host} />
      ))}
    </div>
  );
}

export default HostList;
