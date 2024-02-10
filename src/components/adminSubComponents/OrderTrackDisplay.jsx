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
        <div style={styles.container}>
            {orderTracks.map((track, index) => (
                <div style={styles.orderTrack} key={index}>
                    <h3 style={styles.orderHeader}>{formatTimestamp(track.sk)}</h3>
                    {Object.entries(track.hostOrders).map(([hostId, orders], idx) => (
                        <p style={styles.orderInfo} key={idx}>{hostMap[hostId] || 'Unknown'} - Orders: {orders}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
    },
    orderTrack: {
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        width: '100%'
    },
    orderHeader: {
        color: '#333',
        marginBottom: '10px'
    },
    orderInfo: {
        color: '#555'
    }
};
export default OrderTrackDisplay;


