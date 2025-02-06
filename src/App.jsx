import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    height: '100vh',
    // padding: '20px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '1200px',
    height: '100vh',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  tableContainer: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  tableHeaderContainer: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6',
  },
  tableScrollContainer: {
    flex: 1,
    overflow: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '12px 16px',
    color: '#495057',
    fontWeight: 'bold',
    fontSize: '14px',
    backgroundColor: '#f8f9fa',
    position: 'sticky',
    top: 0,
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #dee2e6',
    color: '#212529',
    fontSize: '14px',
  },
  code: {
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  error: {
    color: '#dc3545',
    padding: '20px',
    textAlign: 'center',
  },
  spinnerContainer: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
};

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://mutaihillary27.pythonanywhere.com/api/pass/piNet2');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const buttonStyle = {
    ...styles.button,
    ...(loading ? styles.buttonDisabled : {}),
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Data Table</h1>
          <button 
            onClick={fetchData} 
            disabled={loading}
            style={buttonStyle}
          >
            {loading && (
              <svg style={styles.spinnerContainer} viewBox="0 0 24 24">
                <circle 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  fill="none" 
                  style={{ opacity: 0.25 }} 
                />
                <path 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  style={{ opacity: 0.75 }} 
                />
              </svg>
            )}
            {loading ? 'Syncing...' : 'Sync Data'}
          </button>
        </div>
        
        <div style={styles.tableContainer}>
          {error ? (
            <div style={styles.error}>
              Error: {error}
            </div>
          ) : (
            <div style={styles.tableScrollContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Code</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td style={styles.td}>{item.id}</td>
                      <td style={{ ...styles.td, ...styles.code }}>
                        {item.code.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index < item.code.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;