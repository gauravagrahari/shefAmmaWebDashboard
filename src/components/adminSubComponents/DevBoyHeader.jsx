import React from 'react';
import '../../index.css'; 

const DevBoyHeader = () => {
    return (
        <div className="devboy-header" style={devboyStyle}>
            <div>Name</div>
            <div>Photo</div>
            <div>Vehicle Type</div>
            <div>Status</div>
        </div>
    );
};
const devboyStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderBottom: '2px solid #ccc',
    fontWeight: 'bold',
};

export default DevBoyHeader;
