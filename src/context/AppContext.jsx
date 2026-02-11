
// import React, { createContext, useContext, useEffect, useState } from "react";

// const AppContext = createContext();
// export const useAppContext = () => useContext(AppContext);

// export const AppProvider = ({ children }) => {
//   const [currentPage, setCurrentPage] = useState("landing");
//   const [leads, setLeads] = useState([]);

//   // Dummy initial data (only used if no localStorage)
//   const initialLeads = [
//     { id: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" }
//   ];

//   /** Load leads once */
//   useEffect(() => {
//     console.log("DEBUG: AppContext mounted");

//     const stored = localStorage.getItem("leads");
//     if (stored) {
//       console.log("DEBUG: Loaded leads from localStorage");
//       setLeads(JSON.parse(stored));
//     } else {
//       console.log("DEBUG: No localStorage leads → using initial");
//       setLeads(initialLeads);

//       localStorage.setItem("leads", JSON.stringify(initialLeads));
//     }
//   }, []);

//   /** Save leads on every change */
//   useEffect(() => {
//     if (leads.length > 0) {
//       localStorage.setItem("leads", JSON.stringify(leads));
//       console.log("DEBUG: Saved leads →", leads);
//     }
//   }, [leads]);

//   /** Add a new lead */
//   const addLead = (lead) => {
//     const newLead = {
//       id: Date.now(),
//       status: "Pending",
//       paymentStatus: "Pending",
//       date: new Date().toLocaleDateString(),
//       ...lead
//     };

//     console.log("DEBUG: Adding new lead", newLead);

//     setLeads((prev) => [...prev, newLead]);
//   };

//   return (
//     <AppContext.Provider value={{ currentPage, setCurrentPage, leads, setLeads, addLead }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const AppProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [clientLead, setClientLead] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', emailContent: null });

  useEffect(() => {
    fetchLeads();
  }, []);

  // Listen for cross-tab localStorage updates to refresh leads automatically
  useEffect(() => {
    function onStorage(e) {
      if (!e) return;
      if (e.key === 'jaga:leads-updated') {
        console.log(' Detected leads update from another tab — refreshing leads');
        fetchLeads();
      }
    }

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const fetchLeads = async () => {
    try {
      console.log(' Fetching leads from server...');
      const response = await fetch(`${API_BASE_URL}/api/leads`);
      const result = await response.json();
      
      console.log(' Server response:', result);
      
      if (result.success && result.data) {
        // Log raw data
        console.log(' Raw data from server:', result.data);
        console.log(' Number of leads:', result.data.length);
        
        // SIMPLIFIED VALIDATION - only require ID to exist
        const validLeads = result.data.filter(lead => {
          const hasId = lead.id && String(lead.id).trim() !== '';
          
          if (!hasId) {
            console.warn(' Lead without ID:', lead);
          }
          
          return hasId;
        });
        
        console.log(` Fetched ${validLeads.length} valid leads from server`);
        
        if (validLeads.length > 0) {
          console.log(' Sample lead:', validLeads[0]);
        }
        
        setLeads(validLeads);
        
        // Update localStorage with clean data
        try {
          localStorage.setItem('jaga:leads', JSON.stringify(validLeads));
        } catch (e) {
          console.warn('Could not persist leads to localStorage:', e);
        }
      } else {
        console.warn(' Failed to fetch leads:', result.error);
      }
    } catch (error) {
      console.error(' Error fetching leads:', error);
      
      // Try to use localStorage as fallback
      try {
        const localLeads = localStorage.getItem('jaga:leads');
        if (localLeads) {
          const parsed = JSON.parse(localLeads);
          console.log(' Using cached leads from localStorage');
          setLeads(parsed);
        }
      } catch (e) {
        console.error('Failed to parse localStorage leads:', e);
      }
    }
  };

  const addLead = async (lead) => {
    try {
      console.log(' Adding lead to server:', lead);
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to add lead');
      }

      if (result.success && result.data) {
        console.log(' Lead added successfully:', result.data.id);
        
        // Add to state if it has a valid ID
        if (result.data.id) {
          setLeads((prev) => {
            const updated = [result.data, ...prev];
            try {
              localStorage.setItem('jaga:leads', JSON.stringify(updated));
            } catch (e) {
              console.warn('Could not persist leads to localStorage:', e);
            }
            return updated;
          });
        }
        
        return result;
      }
    } catch (error) {
      console.error(' Error adding lead:', error);
      throw error;
    }
  };

  const updateLead = async (id, updates) => {
    try {
      const idStr = String(id || '').trim();
      if (!idStr) {
        console.error(' updateLead called with empty id');
        throw new Error('Invalid lead ID');
      }

      console.log(` Updating lead ${idStr}:`, updates);
      
      const response = await fetch(`${API_BASE_URL}/api/leads/${idStr}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update lead');
      }

      if (result.success) {
        console.log(` Lead ${idStr} updated successfully`);

        setLeads((prev) => {
          const updated = prev.map((lead) => 
            String(lead.id) === idStr ? { ...lead, ...updates } : lead
          );
          try {
            localStorage.setItem('jaga:leads', JSON.stringify(updated));
          } catch (e) {
            console.warn('Could not persist leads to localStorage:', e);
          }
          return updated;
        });

        return result;
      }
    } catch (error) {
      console.error(` Error updating lead ${id}:`, error);
      throw error;
    }
  };

  const deleteLead = async (id) => {
    try {
      const idStr = String(id || '').trim();
      if (!idStr) {
        console.error(' deleteLead called with empty id:', id);
        throw new Error('Invalid lead ID');
      }

      setIsLoading(true);
      console.log(` Deleting lead ${idStr} from server...`);
      
      const response = await fetch(`${API_BASE_URL}/api/leads/${idStr}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete lead');
      }

      // Remove from local state
      setLeads(prev => {
        const filtered = prev.filter(lead => String(lead.id) !== idStr);
        try {
          localStorage.setItem('jaga:leads', JSON.stringify(filtered));
        } catch (e) {
          console.warn('Could not persist leads to localStorage:', e);
        }
        return filtered;
      });
      
      console.log(` Lead ${idStr} deleted successfully`);
      return result;
    } catch (error) {
      console.error(' Error deleting lead:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    leads,
    setLeads,
    clientLead,
    setClientLead,
    isLoading,
    setIsLoading,
    message,
    setMessage,
    addLead,
    updateLead,
    fetchLeads,
    deleteLead,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export default AppContext;