import React from 'react';
import '../../index.css'; // Adjust the path according to your project structure

function HostsHeader() {
  return (
    <div className="hostsHeaderContainer">
      <div className="headerItem">Name</div>
      <div className="headerItem">Status</div>
      <div className="headerItem">Phone</div>
      <div className="headerItem">Description</div>
      {/* <div className="headerItem">Current Message</div> */}
      <div className="headerItem">Provided Meals</div>
      {/* <div className="headerItem">Geocode</div> */}
      <div className="headerItem">Rating</div>
      <div className="headerItem">Actions</div> {/* Placeholder for Update/View buttons */}
    </div>
  );
}

export default HostsHeader;
