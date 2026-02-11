// import React, { useMemo, useState } from "react";
// import { useAppContext } from "@/context/AppContext";
// import LeadDetailModal from "@/components/ui/LeadDetailModal";

// console.log("DEBUG: Dashboard.jsx loaded —", new Date().toISOString());
// console.log("DEBUG: Dashboard.jsx top — will log leads on render.");

// const statusBadgeClass = (status) =>
//   status === "Accepted"
//     ? "bg-green-50 text-green-700 border border-green-200"
//     : status === "Rejected"
//     ? "bg-red-50 text-red-600 border border-red-200"
//     : "bg-yellow-50 text-yellow-700 border border-yellow-200";

// const paymentBadgeClass = (p) =>
//   p === "Done" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-gray-100 text-gray-800";

// export default function Dashboard() {
//   const { leads = [], setLeads } = useAppContext();
//   console.log("DEBUG: Dashboard leads:", leads.length, leads[0] || null);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("All Statuses");

//   const summary = useMemo(
//     () => ({
//       total: leads.length,
//       pending: leads.filter((l) => l.status === "Pending").length,
//       accepted: leads.filter((l) => l.status === "Accepted").length,
//     }),
//     [leads]
//   );

//   const filtered = leads.filter((lead) => {
//     const q = query.trim().toLowerCase();
//     const matchesQ =
//       !q ||
//       (lead.name && lead.name.toLowerCase().includes(q)) ||
//       (lead.email && lead.email.toLowerCase().includes(q)) ||
//       (lead.phone && lead.phone.toLowerCase().includes(q));
//     const matchesFilter = filter === "All Statuses" || lead.status === filter;
//     return matchesQ && matchesFilter;
//   });

//   const updateLead = (id, patch) => {
//     if (!setLeads) return;
//     setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
//     setSelectedLead((s) => (s && s.id === id ? { ...s, ...patch } : s));
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8">
//       <header className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
//         <div className="text-sm text-gray-600">
//           Leads: <strong>{summary.total}</strong> • Pending: {summary.pending} • Accepted: {summary.accepted}
//         </div>
//       </header>

//       <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
//         <input
//           aria-label="Search leads"
//           placeholder="Search by Name or Email..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="col-span-2 rounded-lg border px-4 py-2 shadow-sm focus:outline-none"
//         />
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="rounded-lg border px-3 py-2 shadow-sm"
//         >
//           <option>All Statuses</option>
//           <option>Pending</option>
//           <option>Accepted</option>
//           <option>Rejected</option>
//         </select>
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="w-full table-fixed">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">NAME</th>
//               <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">EMAIL / PHONE</th>
//               <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">STATUS</th>
//               <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">PAYMENT STATUS</th>
//               <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">DATE</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
//                   No leads found.
//                 </td>
//               </tr>
//             )}

//             {filtered.map((lead) => (
//               <tr key={lead.id || lead.email} className="border-t">
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => setSelectedLead(lead)}
//                     className="text-left text-base font-medium text-gray-800 hover:underline"
//                   >
//                     {lead.name || "—"}
//                   </button>
//                 </td>

//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   <div>{lead.email || "—"}</div>
//                   <div className="text-xs text-gray-400 mt-1">{lead.phone || ""}</div>
//                 </td>

//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusBadgeClass(lead.status)}`}>
//                     {lead.status || "Pending"}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4">
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${paymentBadgeClass(lead.paymentStatus)}`}>
//                     {lead.paymentStatus || "Pending"}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4 text-sm text-gray-500">{lead.date || lead.createdAt || "—"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedLead && (
//         <LeadDetailModal
//           lead={selectedLead}
//           onClose={() => setSelectedLead(null)}
//           onAccept={() => updateLead(selectedLead.id, { status: "Accepted" })}
//           onReject={() => updateLead(selectedLead.id, { status: "Rejected" })}
//           onPayment={() => updateLead(selectedLead.id, { paymentStatus: "Done" })}
//         />
//       )}
//     </div>
//   );
// }
import React, { useMemo, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import LeadDetailModal from "@/components/ui/LeadDetailModal";

const statusBadgeClass = (status) =>
  status === "Accepted"
    ? "bg-green-50 text-green-700 border border-green-200"
    : status === "Rejected"
    ? "bg-red-50 text-red-600 border border-red-200"
    : "bg-yellow-50 text-yellow-700 border border-yellow-200";

const paymentBadgeClass = (p) =>
  p === "Done" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-gray-100 text-gray-800";

export default function Dashboard() {
  const { leads = [], updateLead, deleteLead, fetchLeads } = useAppContext();
  const [selectedLead, setSelectedLead] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All Statuses");
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  console.log(" Dashboard rendered with", leads.length, "leads");

  const summary = useMemo(
    () => ({
      total: leads.length,
      pending: leads.filter((l) => l.status === "Pending").length,
      accepted: leads.filter((l) => l.status === "Accepted").length,
    }),
    [leads]
  );

  const filtered = leads.filter((lead) => {
    const q = query.trim().toLowerCase();
    const matchesQ =
      !q ||
      (lead.name && lead.name.toLowerCase().includes(q)) ||
      (lead.email && lead.email.toLowerCase().includes(q)) ||
      (lead.phone && lead.phone.toLowerCase().includes(q));
    const matchesFilter = filter === "All Statuses" || lead.status === filter;
    return matchesQ && matchesFilter;
  });

  const handleUpdateLead = async (id, patch) => {
    if (!updateLead) return;
    
    setIsUpdating(true);
    try {
      await updateLead(id, patch);
      console.log(`✓ Lead ${id} updated:`, patch);
      
      // Update the selected lead if it's open
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(prev => ({ ...prev, ...patch }));
      }
    } catch (error) {
      console.error(' Failed to update lead:', error);
      alert(`Failed to update lead: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async (lead) => {
    if (!deleteLead) {
      alert('Delete function not available');
      return;
    }
    
    setIsUpdating(true);
    try {
      await deleteLead(lead.id);
      console.log(` Lead ${lead.id} deleted`);
      
      // Close modal if the deleted lead was open
      if (selectedLead && selectedLead.id === lead.id) {
        setSelectedLead(null);
      }
      
      // Close delete confirmation
      setDeleteConfirm(null);
      
      // Refresh leads list
      await fetchLeads();
    } catch (error) {
      console.error(' Failed to delete lead:', error);
      alert(`Failed to delete lead: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchLeads}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
          >
            🔄 Refresh
          </button>
          <div className="text-sm text-gray-600">
            Leads: <strong>{summary.total}</strong> • Pending: {summary.pending} • Accepted: {summary.accepted}
          </div>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <input
          aria-label="Search leads"
          placeholder="Search by Name or Email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="col-span-2 rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">NAME</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">EMAIL / PHONE</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">COMPANY</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">STATUS</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">On Boarding</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">DATE</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  {leads.length === 0 ? "No leads yet. Submit a form to get started!" : "No leads match your filters."}
                </td>
              </tr>
            )}

            {filtered.map((lead, index) => (
              <tr key={lead.id || `lead-${index}`} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="text-left text-base font-medium text-blue-600 hover:underline"
                  >
                    {lead.name || "—"}
                  </button>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  <div>{lead.email || "—"}</div>
                  <div className="text-xs text-gray-400 mt-1">{lead.phone || ""}</div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {lead.company || "—"}
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusBadgeClass(lead.status)}`}>
                    {lead.status || "Pending"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${paymentBadgeClass(lead.paymentStatus)}`}>
                    {lead.paymentStatus || "Pending"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {lead.date || new Date(lead.createdAt).toLocaleDateString() || "—"}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setDeleteConfirm(lead)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                    title="Delete lead"
                  >
                     Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onAccept={() => handleUpdateLead(selectedLead.id, { status: "Accepted" })}
          onReject={() => handleUpdateLead(selectedLead.id, { status: "Rejected" })}
          onPayment={() => handleUpdateLead(selectedLead.id, { paymentStatus: "Done" })}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the lead for <strong>{deleteConfirm.name}</strong> from <strong>{deleteConfirm.company}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteLead(deleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}