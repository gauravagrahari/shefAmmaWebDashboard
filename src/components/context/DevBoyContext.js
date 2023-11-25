// DevBoyContext.js
import React, { createContext, useState } from 'react';

export const DevBoyContext = createContext();

export const DevBoyProvider = ({ children }) => {
  const [devBoys, setDevBoys] = useState([]);

  // Function to update DevBoy list
  const updateDevBoys = (newDevBoys) => {
    setDevBoys(newDevBoys);
  };

  return (
    <DevBoyContext.Provider value={{ devBoys, updateDevBoys }}>
      {children}
    </DevBoyContext.Provider>
  );
};
