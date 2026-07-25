"use client";

import { useState, useEffect } from 'react';
import { LogOut, Search, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  budgetRange: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
};

export default function LeadsClient() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch leads', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic update
    setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus as any } : lead));
    
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error('Failed to update status', error);
      fetchLeads();
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(search.toLowerCase()) || 
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    (lead.phone && lead.phone.includes(search))
  );

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <h2>Lead Dashboard</h2>
        <div className="dashboard-controls">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search leads..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout} 
            className="btn-primary" 
            style={{ padding: '0.75rem 1rem', width: 'auto' }}
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="table-container"
      >
        {loading ? (
          <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
            <span className="spinner"></span>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Budget</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredLeads.length === 0 ? (
                    <motion.tr 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan={6} className="text-center text-muted" style={{ padding: '4rem 2rem' }}>
                        No leads found matching your search.
                      </td>
                    </motion.tr>
                  ) : (
                    filteredLeads.map((lead, i) => (
                      <motion.tr 
                        key={lead._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                      >
                        <td style={{ fontWeight: 500 }}>{lead.name}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <span className="text-muted">{lead.email}</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Phone size={12} />
                              {lead.phone || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
                            {lead.budgetRange}
                          </span>
                        </td>
                        <td>
                          <div style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={lead.message}>
                            {lead.message}
                          </div>
                        </td>
                        <td className="text-muted" style={{ fontSize: '0.875rem' }}>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <select 
                            className={`status-select status-${lead.status.toLowerCase()}`}
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </>
  );
}
