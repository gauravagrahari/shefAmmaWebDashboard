import React, { useContext, useEffect } from 'react';
import DevBoyHeader from '../adminSubComponents/DevBoyHeader';
import DevBoyDetails from '../adminSubComponents/DevBoyDetails';
import axios from 'axios';
import { DevBoyContext } from './context/DevBoyContext'; // Adjust the import path

const DevBoyList = () => {
  const { devBoys, updateDevBoys } = useContext(DevBoyContext);

  useEffect(() => {
    const fetchDevBoys = async () => {
      try {
        const response = await axios.post('/admin/getAllDevBoys');
        updateDevBoys(response.data);
      } catch (err) {
        console.error("Error while fetching DevBoy list", err);
      }
    };

    fetchDevBoys();
  }, [updateDevBoys]);

  return (
    <div>
      <DevBoyHeader />
      {devBoys.map((devBoy) => (
        <DevBoyDetails key={devBoy.uuidDevBoy} devBoy={devBoy} />
      ))}
    </div>
  );
};

export default DevBoyList;
