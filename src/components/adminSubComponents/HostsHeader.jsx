function HostsHeader() {
  const styles = {
    headerContainer: {
      display: 'flex',
      padding: '10px 0',
      borderBottom: '2px solid #ccc',
    },
    headerItem: {
      margin: '0 5px',
      flexGrow: 1,
    },
    headerItemShort: {
      width: '60px', // For 'Provided Meals'
      margin: '0 5px',
    },
    headerItemLarge: {
      flexGrow: 2, // More space for 'Description'
      minWidth: '200px',
      margin: '0 5px',
    },
  };

  return (
    <div style={styles.headerContainer}>
      <div style={styles.headerItem}>Name</div>
      <div style={styles.headerItem}>Status</div>
      <div style={styles.headerItem}>Phone</div>
      <div style={styles.headerItemLarge}>Description</div>
      <div style={styles.headerItemShort}>Meals</div>
      <div style={styles.headerItem}>Rating</div>
      <div style={{ flex: 1, margin: '0 5px' }}>Actions</div> 
    </div>
  );
}

export default HostsHeader;
