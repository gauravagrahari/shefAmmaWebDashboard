import React from 'react';

const OrderTrackDisplay = ({ orderTracks, hosts }) => {
    const hostMap = hosts.reduce((acc, host) => {
        acc[host.uuidHost] = host.nameHost;
        return acc;
    }, {});

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
    };
    return (
        <div className="orderTrackContainer">
            {orderTracks.map((track, index) => (
                <div className="orderTrack" key={index}>
                    <h3>{formatTimestamp(track.sk)}</h3>
                    {Object.entries(track.hostOrders).map(([hostId, orders], idx) => (
                        <p key={idx}>{hostMap[hostId] || 'Unknown'} - Orders: {orders}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default OrderTrackDisplay;


