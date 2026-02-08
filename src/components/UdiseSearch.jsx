import React, { useState } from "react";

const UdiseSearch = () => {
  const [udise, setUdise] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (!udise.trim()) {
      setError("Please enter a UDISE code");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {

      // https://schoolbackendudise-u4nx.onrender.com/api/schools/070502ND201
      const res = await fetch(` https://schoolbackendudise-u4nx.onrender.com/api/schools/${udise}`);
      if (!res.ok) {
        throw new Error("School not found");
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferred = async (nearbyCode) => {
    try {
      await fetch(" https://schoolbackendudise-u4nx.onrender.com/api/schools/preferred", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          udise: data.school.udise_code,
          nearby: nearbyCode,
        }),
      });

      setData((prev) => ({
        ...prev,
        nearby: prev.nearby.map((n) =>
          n.udise_code === nearbyCode ? { ...n, preferred: "yes" } : n
        ),
      }));
    } catch (err) {
      setError("Failed to update preferred school");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>🏫 Nearby School Finder</h1>
          <p style={styles.subtitle}>Search and manage nearby schools using UDISE codes</p>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Search Section */}
        <div style={styles.searchSection}>
          <div style={styles.searchCard}>
            <div style={styles.searchHeader}>
              <h2 style={styles.searchTitle}>Search School</h2>
              <div style={styles.searchIndicator}>
                <div style={styles.indicatorDot}></div>
                <span style={styles.indicatorText}>Live</span>
              </div>
            </div>
            
            <div style={styles.searchContainer}>
              <div style={styles.inputGroup}>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>🔍</span>
                  <input
                    value={udise}
                    onChange={(e) => setUdise(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter UDISE Code"
                    style={styles.input}
                    disabled={loading}
                  />
                  <div style={styles.inputHint}>
                    <span style={styles.hintText}>Enter 11-digit UDISE code</span>
                  </div>
                </div>
                
                <button 
                  onClick={search} 
                  style={loading ? styles.buttonDisabled : styles.button}
                  disabled={loading}
                >
                  {loading ? (
                    <span style={styles.buttonContent}>
                      <span style={styles.spinner}></span>
                      Searching...
                    </span>
                  ) : (
                    "Search School"
                  )}
                </button>
              </div>
              
              {error && (
                <div style={styles.errorAlert}>
                  <span style={styles.errorIcon}>⚠️</span>
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {data && (
          <div style={styles.resultsSection}>
            {/* Main School Card */}
            <div style={styles.currentSchoolCard}>
              <div style={styles.currentSchoolHeader}>
                <h3 style={styles.currentSchoolTitle}>Current School</h3>
                <span style={styles.currentSchoolBadge}>Active</span>
              </div>
              
              <div style={styles.currentSchoolBody}>
                <div style={styles.schoolInfo}>
                  <div style={styles.schoolNameRow}>
                    <h4 style={styles.schoolName}>{data.school.school_name}</h4>
                    <span style={styles.udiseBadge}>UDISE: {data.school.udise_code}</span>
                  </div>
                  
                  <div style={styles.schoolActions}>
                    <a
                      href={data.school.location_url}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.mapButton}
                    >
                      <span style={styles.mapIcon}>📍</span>
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Schools Table */}
            <div style={styles.tableSection}>
              <div style={styles.tableHeader}>
                <h3 style={styles.tableTitle}>Nearby Schools</h3>
                <div style={styles.tableStats}>
                  <span style={styles.statItem}>
                    Total: <strong>{data.nearby.filter(n => n.preferred === "no").length}</strong>
                  </span>
                  <span style={styles.statItem}>
                    Preferred: <strong>{data.nearby.filter(n => n.preferred === "yes").length}</strong>
                  </span>
                </div>
              </div>

              <div style={styles.tableContainer}>
                <div style={styles.tableScroll}>
                  <table style={styles.table}>
                    <thead style={styles.tableHead}>
                      <tr>
                        <th style={styles.th}>UDISE Code</th>
                        <th style={styles.th}>School Name</th>
                        <th style={styles.th}>Contact</th>
                        <th style={styles.th}>Distance</th>
                        <th style={styles.th}>Location</th>
                        <th style={styles.th}>Actions</th>
                      </tr>
                    </thead>
                    
                    <tbody style={styles.tableBody}>
                      {data.nearby
                        .filter((n) => n.preferred === "no")
                        .map((item) => (
                          <tr key={item.udise_code} style={styles.tableRow}>
                            <td style={styles.td}>
                              <div style={styles.udiseCell}>
                                <span style={styles.udiseCode}>{item.udise_code}</span>
                              </div>
                            </td>
                            <td style={styles.td}>
                              <div style={styles.nameCell}>
                                <span style={styles.schoolNameText}>{item.school_name}</span>
                              </div>
                            </td>
                            <td style={styles.td}>
                              <div style={styles.contactCell}>
                                {item.mobile ? (
                                  <a href={`tel:${item.mobile}`} style={styles.phoneLink}>
                                    📞 {item.mobile}
                                  </a>
                                ) : (
                                  <span style={styles.naText}>N/A</span>
                                )}
                              </div>
                            </td>
                            <td style={styles.td}>
                              <div style={styles.distanceCell}>
                                <span style={styles.distanceValue}>{item.distance_km} km</span>
                              </div>
                            </td>
                            <td style={styles.td}>
                              <a
                                href={item.location_url}
                                target="_blank"
                                rel="noreferrer"
                                style={styles.mapLink}
                              >
                                <span style={styles.mapLinkIcon}>🗺️</span>
                                View Map
                              </a>
                            </td>
                            <td style={styles.td}>
                              <button
                                style={styles.actionButton}
                                onClick={() => updatePreferred(item.udise_code)}
                              >
                                <span style={styles.actionIcon}>⭐</span>
                                Mark Preferred
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  
                  {data.nearby.filter(n => n.preferred === "no").length === 0 && (
                    <div style={styles.emptyState}>
                      <div style={styles.emptyIcon}>🏫</div>
                      <p style={styles.emptyText}>All nearby schools have been marked as preferred</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div style={styles.tableFooter}>
                <div style={styles.footerNote}>
                  <span style={styles.noteIcon}>💡</span>
                  Click "Mark Preferred" to mark a nearby school as preferred
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} Nearby School Finder • UDISE Database System
        </p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  // Header Styles
  header: {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '1.5rem 1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.025em',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#cbd5e1',
    margin: 0,
    opacity: 0.9,
  },
  
  // Main Content
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
  },
  
  // Search Section
  searchSection: {
    marginBottom: '2rem',
  },
  searchCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  searchHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  searchTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: 0,
  },
  searchIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  indicatorDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
  indicatorText: {
    fontSize: '0.875rem',
  },
  searchContainer: {
    padding: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flex: '1',
    minWidth: '300px',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1.25rem',
  },
  input: {
    width: '100%',
    padding: '0.875rem 1rem 0.875rem 3rem',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  inputHint: {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: '#64748b',
  },
  button: {
    padding: '0.875rem 1.75rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '140px',
    alignSelf: 'flex-start',
  },
  buttonDisabled: {
    padding: '0.875rem 1.75rem',
    backgroundColor: '#94a3b8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'not-allowed',
    minWidth: '140px',
    alignSelf: 'flex-start',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    padding: '0.875rem',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '8px',
    fontSize: '0.875rem',
  },
  errorIcon: {
    fontSize: '1.125rem',
  },
  
  // Current School Card
  currentSchoolCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    overflow: 'hidden',
  },
  currentSchoolHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    backgroundColor: '#f1f5f9',
    borderBottom: '1px solid #e2e8f0',
  },
  currentSchoolTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    margin: 0,
    color: '#1e293b',
  },
  currentSchoolBadge: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  currentSchoolBody: {
    padding: '1.5rem',
  },
  schoolInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  schoolNameRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1rem',
  },
  schoolName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  udiseBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '0.375rem 0.875rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  schoolActions: {
    display: 'flex',
    gap: '1rem',
  },
  mapButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.625rem 1.25rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  mapIcon: {
    fontSize: '1rem',
  },
  
  // Table Section
  tableSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1.5rem 1.5rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  tableTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0,
  },
  tableStats: {
    display: 'flex',
    gap: '1.5rem',
  },
  statItem: {
    fontSize: '0.875rem',
    color: '#64748b',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  tableScroll: {
    minWidth: '800px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHead: {
    backgroundColor: '#f8fafc',
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#64748b',
    borderBottom: '2px solid #e2e8f0',
    whiteSpace: 'nowrap',
  },
  tableBody: {
    backgroundColor: 'white',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f8fafc',
    },
  },
  td: {
    padding: '1rem',
    fontSize: '0.875rem',
    color: '#334155',
  },
  udiseCell: {
    fontFamily: 'monospace',
    fontWeight: '600',
    color: '#1e40af',
  },
  nameCell: {
    maxWidth: '250px',
  },
  schoolNameText: {
    fontWeight: '500',
    color: '#1e293b',
  },
  contactCell: {
    whiteSpace: 'nowrap',
  },
  phoneLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  naText: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  distanceCell: {
    fontWeight: '600',
    color: '#059669',
  },
  mapLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    backgroundColor: '#10b981',
    color: 'white',
    padding: '0.375rem 0.75rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.75rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  mapLinkIcon: {
    fontSize: '0.875rem',
  },
  actionButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    backgroundColor: '#f59e0b',
    color: 'white',
    padding: '0.5rem 0.875rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  actionIcon: {
    fontSize: '0.875rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 1rem',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    opacity: 0.5,
  },
  emptyText: {
    color: '#64748b',
    margin: 0,
    fontSize: '0.875rem',
  },
  tableFooter: {
    padding: '1rem 1.5rem',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
  },
  footerNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontSize: '0.875rem',
  },
  noteIcon: {
    fontSize: '1rem',
  },
  
  // Footer
  footer: {
    marginTop: '3rem',
    padding: '1.5rem 1rem',
    backgroundColor: '#1e293b',
    color: '#cbd5e1',
    textAlign: 'center',
  },
  footerText: {
    margin: 0,
    fontSize: '0.875rem',
  },
};

// Add CSS animations
const globalStyles = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  button:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    .input-wrapper {
      min-width: 100%;
    }
    
    .button {
      width: 100%;
    }
    
    .table-stats {
      flex-wrap: wrap;
      gap: 0.75rem;
    }
  }
  
  @media (max-width: 480px) {
    .search-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
    
    .school-name-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
`;

// Add global styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = globalStyles;
  document.head.appendChild(styleSheet);
}

export default UdiseSearch;