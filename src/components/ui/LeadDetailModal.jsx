// import React from "react";

// const Row = ({ label, value }) => (
//   <div className="mb-3">
//     <div className="text-xs text-gray-500 font-medium">{label}</div>
//     <div className="text-sm text-gray-800">{value || "—"}</div>
//   </div>
// );

// const Badge = ({ children, className = "" }) => (
//   <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${className}`}>{children}</span>
// );

// const LeadDetailModal = ({ lead, onClose, onAccept, onReject, onPayment }) => {
//   if (!lead) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
//         <div className="flex items-start justify-between mb-4">
//           <h3 className="text-xl font-semibold">{lead.name}'s Details</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
//         </div>

//         <div className="border-b pb-4 mb-4">
//           <div className="flex gap-4 items-center">
//             <div className="flex-1">
//               <Row label="Email" value={lead.email} />
//               <Row label="Phone" value={lead.phone} />
//               <Row label="Company" value={lead.company} />
//               <Row label="Initial Inquiry Date" value={lead.date || lead.createdAt} />
//             </div>
//             <div className="w-48">
//               <div className="mb-2">
//                 <div className="text-xs text-gray-500 font-medium">Service Status</div>
//                 <Badge className={`mt-1 ${lead.status === "Accepted" ? "bg-green-50 text-green-700 border border-green-200" : lead.status === "Rejected" ? "bg-red-50 text-red-600 border border-red-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`}>
//                   {lead.status || "Pending"}
//                 </Badge>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500 font-medium">Payment Status</div>
//                 <Badge className={`mt-1 ${lead.paymentStatus === "Done" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-gray-100 text-gray-800"}`}>
//                   {lead.paymentStatus || "Pending"}
//                 </Badge>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mb-4">
//           <Row label="Service Type" value={lead.serviceType} />
//           <Row label="Employment Type" value={lead.employmentType} />
//           <Row label="Gender Preference" value={lead.genderPreference} />
//           <Row label="Budget Range" value={lead.budgetRange} />
//           <div className="mb-3">
//             <div className="text-xs text-gray-500 font-medium">Detailed Requirements</div>
//             <div className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">{lead.message || "Client has not yet filled out the detailed requirements form."}</div>
//           </div>
//         </div>

//         <div className="flex justify-end gap-3">
//           <button onClick={() => onReject && onReject()} className="px-4 py-2 rounded-md bg-red-500 text-white">Reject</button>
//           <button onClick={() => onAccept && onAccept()} className="px-4 py-2 rounded-md bg-green-500 text-white">Accept</button>
//           <button onClick={() => onPayment && onPayment()} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800">Pay Done</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadDetailModal;
import React from "react";

const Row = ({ label, value }) => (
  <div className="mb-3">
    <div className="text-xs text-gray-500 font-medium">{label}</div>
    <div className="text-sm text-gray-800">{value || "—"}</div>
  </div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${className}`}>
    {children}
  </span>
);

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h4 className="text-sm font-bold text-gray-700 mb-3 pb-2 border-b">{title}</h4>
    {children}
  </div>
);

const LeadDetailModal = ({ lead, onClose, onAccept, onReject, onPayment }) => {
  if (!lead) return null;

  // Helper to render array data as badges
  const renderArrayAsBadges = (arr, colorClass = "bg-blue-50 text-blue-700 border-blue-200") => {
    if (!arr || arr.length === 0) return "—";
    return (
      <div className="flex flex-wrap gap-2 mt-1">
        {arr.map((item, idx) => (
          <span 
            key={idx}
            className={`px-3 py-1 text-xs rounded-full border ${colorClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{lead.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Lead Details & Requirements</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {/* Status Overview */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex gap-6 items-center">
            <div className="flex-1">
              <div className="text-xs text-gray-500 font-medium mb-1">Service Status</div>
              <Badge 
                className={`${
                  lead.status === "Accepted" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : lead.status === "Rejected" 
                    ? "bg-red-50 text-red-600 border border-red-200" 
                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                }`}
              >
                {lead.status || "Pending"}
              </Badge>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 font-medium mb-1">Payment Status</div>
              <Badge 
                className={`${
                  lead.paymentStatus === "Done" 
                    ? "bg-amber-50 text-amber-700 border border-amber-200" 
                    : "bg-gray-100 text-gray-800 border border-gray-300"
                }`}
              >
                {lead.paymentStatus || "Pending"}
              </Badge>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 font-medium mb-1">Inquiry Date</div>
              <div className="text-sm font-medium text-gray-800">
                {lead.date || new Date(lead.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Section 1: Business Information */}
          <Section title="1. Business Information">
            <div className="grid grid-cols-2 gap-4">
              <Row label="Primary Contact Name" value={lead.name} />
              <Row label="Email Address" value={lead.email} />
              <Row label="Phone Number" value={lead.phone} />
              <Row label="Business Name" value={lead.company} />
              <Row label="Business Website" value={lead.businessWebsite} />
              <Row label="Industry / Sector" value={lead.industrySector} />
              {lead.industrySectorOther && (
                <Row label="Other Industry" value={lead.industrySectorOther} />
              )}
            </div>
          </Section>

          {/* Section 2: About Your Business */}
          <Section title="2. About Your Business">
            <div className="mb-3">
              <div className="text-xs text-gray-500 font-medium">Business Description</div>
              <div className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                {lead.businessDescription || "—"}
              </div>
            </div>
            
            {lead.supportRequired && lead.supportRequired.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 font-medium mb-2">Support Required</div>
                {renderArrayAsBadges(lead.supportRequired, "bg-blue-50 text-blue-700 border-blue-200")}
              </div>
            )}
            
            {lead.supportRequiredOther && (
              <Row label="Other Support Requirements" value={lead.supportRequiredOther} />
            )}
          </Section>

          {/* Section 3: Task Details */}
          <Section title="3. Task Details">
            {lead.generalAdminTasks && lead.generalAdminTasks.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">General Admin Tasks</div>
                {renderArrayAsBadges(lead.generalAdminTasks, "bg-purple-50 text-purple-700 border-purple-200")}
              </div>
            )}

            {lead.socialMediaManagementTasks && lead.socialMediaManagementTasks.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">Social Media Tasks</div>
                {renderArrayAsBadges(lead.socialMediaManagementTasks, "bg-pink-50 text-pink-700 border-pink-200")}
              </div>
            )}

            {lead.bookkeepingTasks && lead.bookkeepingTasks.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">Bookkeeping Tasks</div>
                {renderArrayAsBadges(lead.bookkeepingTasks, "bg-green-50 text-green-700 border-green-200")}
              </div>
            )}

            {lead.marketingContentTasks && lead.marketingContentTasks.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">Marketing & Content Tasks</div>
                {renderArrayAsBadges(lead.marketingContentTasks, "bg-orange-50 text-orange-700 border-orange-200")}
              </div>
            )}

            {lead.websiteSEOTasks && lead.websiteSEOTasks.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">Website & SEO Tasks</div>
                {renderArrayAsBadges(lead.websiteSEOTasks, "bg-indigo-50 text-indigo-700 border-indigo-200")}
              </div>
            )}

            {lead.emailMarketingTasks && lead.emailMarketingTasks.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">Email Marketing Tasks</div>
                {renderArrayAsBadges(lead.emailMarketingTasks, "bg-cyan-50 text-cyan-700 border-cyan-200")}
              </div>
            )}

            {lead.otherTaskRequirements && (
              <div className="mb-3">
                <div className="text-xs text-gray-500 font-medium">Other Task Requirements</div>
                <div className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  {lead.otherTaskRequirements}
                </div>
              </div>
            )}
          </Section>

          {/* Section 4: Workload & Availability */}
          <Section title="4. Workload & Availability">
            <div className="grid grid-cols-2 gap-4">
              <Row label="Hours Required" value={lead.employmentType} />
              {lead.preferredShift && (
                <Row label="Preferred Part-time Shift" value={lead.preferredShift} />
              )}
              <Row label="Gender Preference" value={lead.genderPreference} />
            </div>
          </Section>

          {/* Section 5: Required Skills & Experience */}
          <Section title="5. Required Skills & Experience">
            <div className="mb-3">
              <div className="text-xs text-gray-500 font-medium">Specific Skill Sets Required</div>
              <div className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                {lead.specificSkillSets || "—"}
              </div>
            </div>
          </Section>

          {/* Section 6: Tools, Software & Systems */}
          <Section title="6. Tools, Software & Systems">
            {lead.keyToolsAndSoftwareOffice && lead.keyToolsAndSoftwareOffice.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">Office & Communication</div>
                {renderArrayAsBadges(lead.keyToolsAndSoftwareOffice, "bg-blue-50 text-blue-700 border-blue-200")}
              </div>
            )}
            
            {lead.keyToolsAndSoftwareOtherOffice && (
              <Row label="Other Office & Communication Software" value={lead.keyToolsAndSoftwareOtherOffice} />
            )}

            {lead.keyToolsAndSoftwareCRM && lead.keyToolsAndSoftwareCRM.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">CRM / Project Management</div>
                {renderArrayAsBadges(lead.keyToolsAndSoftwareCRM, "bg-purple-50 text-purple-700 border-purple-200")}
              </div>
            )}
            
            {lead.keyToolsAndSoftwareOtherCRM && (
              <Row label="Other CRM / Project Management" value={lead.keyToolsAndSoftwareOtherCRM} />
            )}

            {lead.keyToolsAndSoftwareAccounting && lead.keyToolsAndSoftwareAccounting.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">Accounting Software</div>
                {renderArrayAsBadges(lead.keyToolsAndSoftwareAccounting, "bg-green-50 text-green-700 border-green-200")}
              </div>
            )}
            
            {lead.keyToolsAndSoftwareOtherAccounting && (
              <Row label="Other Accounting Software" value={lead.keyToolsAndSoftwareOtherAccounting} />
            )}

            {lead.keyToolsAndSoftwareMarketing && lead.keyToolsAndSoftwareMarketing.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 font-medium mb-2">Marketing / Design Tools</div>
                {renderArrayAsBadges(lead.keyToolsAndSoftwareMarketing, "bg-pink-50 text-pink-700 border-pink-200")}
              </div>
            )}
            
            {lead.keyToolsAndSoftwareOtherMarketing && (
              <Row label="Other Marketing / Design Tools" value={lead.keyToolsAndSoftwareOtherMarketing} />
            )}
          </Section>

          {/* Section 7: Training, Access & Compliance */}
          <Section title="7. Training, Access & Compliance">
            <div className="grid grid-cols-2 gap-4">
              <Row label="Will provide internal process training?" value={lead.trainingProvided} />
              <Row label="NDA Required?" value={lead.ndaRequired} />
            </div>
            {lead.complianceRequirements && (
              <div className="mb-3 mt-3">
                <div className="text-xs text-gray-500 font-medium">Compliance/Security Requirements</div>
                <div className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  {lead.complianceRequirements}
                </div>
              </div>
            )}
          </Section>

          {/* Section 8: Discovery Call */}
          <Section title="8. Discovery Call">
            <div className="grid grid-cols-2 gap-4">
              <Row label="Discovery Call Required?" value={lead.discoveryCallRequired} />
              {lead.preferredCallTime && (
                <Row label="Preferred Call Time" value={lead.preferredCallTime} />
              )}
            </div>
          </Section>

          {/* Additional Information */}
          <Section title="9. Additional Information">
            <div className="mb-3">
              <div className="text-xs text-gray-500 font-medium">Message / Additional Notes</div>
              <div className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded min-h-[80px]">
                {lead.message || lead.requirements || "No additional notes provided."}
              </div>
            </div>
          </Section>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
          <button 
            onClick={() => onReject && onReject()} 
            disabled={lead.status === 'accepted' || lead.status === 'rejected' || lead.status === 'Accepted' || lead.status === 'Rejected'}
            className={`px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition ${lead.status === "Accepted" || lead.status === "Rejected"
        ? "bg-red-300 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600"
      }`}
          >
            Reject
          </button>
          <button 
            onClick={() => onAccept && onAccept()} 
            disabled={lead.status === 'accepted' || lead.status === 'rejected' || lead.status === 'Accepted' || lead.status === 'Rejected'}
            className={`px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition ${lead.status === "Accepted" || lead.status === "Rejected"
        ? "bg-green-300 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600"
      }`}
          >
            Accept
          </button>
          <button 
            onClick={() => onPayment && onPayment()} 
            disabled={lead.status==='Done'}
            className={`px-6 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition ${(lead.paymentStatus === "Done" || lead.status === "Onboarded")
        ? "bg-amber-300 cursor-not-allowed"
        : "bg-amber-500 hover:bg-amber-600"
      }`}
          >
            On Board Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailModal;