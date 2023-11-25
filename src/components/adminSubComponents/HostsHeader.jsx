import React from 'react';
import styles from '../index'; // Adjust the path according to your project structure

function HostsHeader() {
  return (
    <div style={styles.hostsHeaderContainer}>
      <div style={styles.headerItem}>Name</div>
      <div style={styles.headerItem}>Phone</div>
      <div style={styles.headerItem}>Dine Category</div>
      <div style={styles.headerItem}>DDP</div>
      <div style={styles.headerItem}>DP</div>
      <div style={styles.headerItem}>Description</div>
      <div style={styles.headerItem}>Current Message</div>
      <div style={styles.headerItem}>Provided Meals</div>
      <div style={styles.headerItem}>Geocode</div>
      <div style={styles.headerItem}>Rating</div>
      <div style={styles.headerItem}>Actions</div> {/* Placeholder for Update/View buttons */}
    </div>
  );
}

export default HostsHeader;
