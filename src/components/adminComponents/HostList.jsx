import React, { useContext, useEffect } from "react";
import axios from "axios";
import { HostContext } from '../context/HostContext'; // Adjust the path
import HostsItem from "../adminSubComponents/HostsItem";

function HostList() {
  const { hosts, updateHosts } = useContext(HostContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.post(`${apiUrl}/admin/getAllHosts`);
        updateHosts(response.data);
      } catch (err) {
        console.error("Error fetching hosts", err);
      }
    };

    if (hosts.length === 0) {
      fetchHosts();
    }
  }, [hosts, updateHosts]);

  return (
    <div>
  
      {hosts.map((host) => (
        <HostsItem key={host.uuidHost} hostData={host} />
      ))}
    </div>
  );
}

export default HostList;
