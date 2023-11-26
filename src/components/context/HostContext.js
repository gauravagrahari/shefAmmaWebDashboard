import React, { createContext, useState } from 'react';

export const HostContext = createContext();

export const HostProvider = ({ children }) => {
  const [hosts, setHosts] = useState([]);

  // Function to update Host list
  const updateHosts = (newHosts) => {
    setHosts(newHosts);
  };

  return (
    <HostContext.Provider value={{ hosts, updateHosts }}>
      {children}
    </HostContext.Provider>
  );
};
