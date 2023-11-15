import React, { useState } from "react";
import DevBoyHeader from "../adminSubComponents/DevBoyHeader";
import DevBoyDetails from "../adminSubComponents/DevBoyDetails";
import axios from "axios";

const DevBoyList = () => {
  const [devBoys, setDevBoys] = useState([]);

  useEffect(() => {
    const fetchDevBoys = async () => {
      try {
        const response = await axios.get();
        setDevBoys(response.data);
      } catch (err) {
        console.error("error while fetching devBoy list", err);
      }
    };
    fetchDevBoys();
  }, []);
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
