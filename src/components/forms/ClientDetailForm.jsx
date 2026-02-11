// import React, { useEffect, useState } from "react";
// import { Loader2 } from "lucide-react";
// import { useAppContext } from "@/context/AppContext";
// import { GoogleSheetService } from "@/utils/googleSheetService";
// import { sendEmailViaServer } from "@/utils/sendemail";

// const ClientDetailForm = () => {
//   const {
//     leads,
//     clientLead,
//     setClientLead,
//     isLoading,
//     setIsLoading,
//     message,
//     setMessage,
//   } = useAppContext();

//   // Detect if this is a new-client flow triggered by `?view=client&id=new`
//   const params = new URLSearchParams(window.location.search);
//   const idParam = params.get("id");
//   const isNewClientFlow = idParam === "new" && !clientLead;

//   // Shared form state: if editing an existing client, requirements only;
//   // if creating via the client/new URL, include full contact fields.
//   const [formData, setFormData] = useState({
//     requirements: clientLead?.requirements || "",
//     name: clientLead?.name || "",
//     email: clientLead?.email || "",
//     phone: clientLead?.phone || "",
//     company: clientLead?.company || "",
//     serviceType: clientLead?.serviceType || "",
//     employmentType: clientLead?.employmentType || "",
//     genderPreference: clientLead?.genderPreference || "",
//     budgetRange: clientLead?.budgetRange || "",
//   });

//   const [isSubmittingNew, setIsSubmittingNew] = useState(false);

//   if (!clientLead && !isNewClientFlow) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-gray-600">Invalid client link or missing data.</p>
//       </div>
//     );
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setIsLoading(true);

//     try {
//       await GoogleSheetService.updateRow(clientLead.id, {
//         requirements: formData.requirements,
//       });

//       const emailPrompt = `
//         Create a professional confirmation email for a client who submitted project requirements.
//         Client Name: ${clientLead.name}
//         Requirements: ${formData.requirements}
//       `;

//       const emailContent = await sendEmailViaServer(
//         emailPrompt,
//         clientLead.email
//       );

//       setMessage({
//         text: "Your detailed requirements have been submitted successfully!",
//         emailContent,
//       });

//       setTimeout(() => window.history.pushState({}, "", "/"), 3000);
//     } catch (error) {
//       console.error("Error updating requirements:", error);
//       setMessage({
//         text: "Something went wrong. Please try again later.",
//         emailContent: null,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handler for new-client submissions (when routed to ?view=client&id=new)
//   const handleNewClientSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmittingNew(true);

//     try {
//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         company: formData.company,
//         serviceType: formData.serviceType,
//         employmentType: formData.employmentType,
//         genderPreference: formData.genderPreference,
//         budgetRange: formData.budgetRange,
//         message: formData.requirements || "",
//       };

//       const res = await fetch("/api/leads", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setMessage({ text: "Your request has been submitted. We'll contact you shortly!", emailContent: null });
//         // After successful submit, navigate back to landing
//         setTimeout(() => window.history.pushState({}, "", "/"), 1200);
//       } else {
//         setMessage({ text: "Error submitting. Please try again.", emailContent: null });
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage({ text: "Connection error. Please try again later.", emailContent: null });
//     } finally {
//       setIsSubmittingNew(false);
//     }
//   };

//   if (isNewClientFlow) {
//     return (
//       <section className="pt-10 pb-20 px-6 md:px-10 bg-gray-50">
//         <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
//           <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//             Get Started — Submit Your Requirements
//           </h2>

//           {message.text && (
//             <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center mb-4">
//               <p>{message.text}</p>
//             </div>
//           )}

//           <form onSubmit={handleNewClientSubmit} className="grid gap-6 md:grid-cols-2">
//             <div>
//               <label className="text-sm font-bold text-black">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//                 className="mt-2 w-full rounded-lg border-2 border-gray-400 px-4 py-3 outline-none bg-white"
//                 placeholder="John Doe"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-black">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//                 className="mt-2 w-full rounded-lg border-2 border-gray-400 px-4 py-3 outline-none bg-white"
//                 placeholder="john@company.com"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-bold text-black">number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 required
//                 className="mt-2 w-full rounded-lg border-2 border-gray-400 px-4 py-3 outline-none bg-white"
//                 placeholder="+1 (555) 000-0000"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-bold text-black">Company Name</label>
//               <input
//                 type="text"
//                 name="company"
//                 value={formData.company}
//                 onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                 className="mt-2 w-full rounded-lg border-2 border-gray-400 px-4 py-3 outline-none bg-white"
//                 placeholder="Your Company Inc."
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="text-sm font-bold text-black">Service Type</label>
//               <select
//                 name="serviceType"
//                 value={formData.serviceType}
//                 onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
//                 required
//                 className="mt-2 w-full rounded-lg border-2 border-gray-400 px-4 py-3 outline-none bg-white">
//                 <option>Select a service</option>
//                 <option>Administrative Support</option>
//                 <option>Customer Service</option>
//                 <option>24/7 Availability</option>
//                 <option>Social Media Management</option>
//                 <option>Email & Calendar Management</option>
//                 <option>Executive Assistance</option>
//               </select>
//             </div>

//             <div className="bg-yellow-100 p-3 rounded">
//               <label className="text-sm font-bold text-black">⭐ Part-time / Full-time</label>
//               <select
//                 name="employmentType"
//                 value={formData.employmentType}
//                 onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
//                 required
//                 className="mt-2 w-full rounded-lg border-2 border-yellow-500 px-4 py-3 outline-none bg-white">
//                 <option>Select requirement</option>
//                 <option>Part-time</option>
//                 <option>Full-time</option>
//               </select>
//             </div>

//             <div className="bg-yellow-100 p-3 rounded">
//               <label className="text-sm font-bold text-black">⭐ Gender Preference</label>
//               <select
//                 name="genderPreference"
//                 value={formData.genderPreference}
//                 onChange={(e) => setFormData({ ...formData, genderPreference: e.target.value })}
//                 required
//                 className="mt-2 w-full rounded-lg border-2 border-yellow-500 px-4 py-3 outline-none bg-white">
//                 <option>Select preference</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Not specific</option>
//               </select>
//             </div>

//             <div className="bg-yellow-100 p-3 rounded">
//               <label className="text-sm font-bold text-black">⭐ Budget / Price Range</label>
//               <select
//                 name="budgetRange"
//                 value={formData.budgetRange}
//                 onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
//                 required
//                 className="mt-2 w-full rounded-lg border-2 border-yellow-500 px-4 py-3 outline-none bg-white">
//                 <option>Select budget</option>
//                 <option>$1,000 - $5,000</option>
//                 <option>$5,000 - $10,000</option>
//                 <option>$10,000 - $25,000</option>
//                 <option>$25,000+</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="text-sm font-bold text-black">Message</label>
//               <textarea
//                 name="requirements"
//                 value={formData.requirements}
//                 onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
//                 rows="4"
//                 className="mt-2 w-full rounded-lg border-2 border-gray-400 px-4 py-3 outline-none bg-white"
//                 placeholder="Tell us about your requirements..."
//               />
//             </div>

//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 disabled={isSubmittingNew}
//                 className="w-full rounded-lg bg-yellow-400 py-4 text-black font-bold text-lg hover:bg-yellow-500 transition shadow-md disabled:bg-gray-400"
//               >
//                 {isSubmittingNew ? "Submitting..." : "Submit Request"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="pt-10 pb-20 px-6 md:px-10 bg-gray-50">
//       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//           Provide More Project Details
//         </h2>

//         {message.text && (
//           <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center mb-4">
//             <p>{message.text}</p>

//             {message.emailContent && (
//               <details className="text-left mt-2 cursor-pointer">
//                 <summary className="font-semibold">Generated Email</summary>
//                 <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg mt-2 text-xs whitespace-pre-wrap">
//                   {message.emailContent}
//                 </pre>
//               </details>
//             )}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Detailed Requirements</label>
//             <textarea
//               required
//               rows="6"
//               value={formData.requirements}
//               onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
//               placeholder="Describe your requirements in detail..."
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 font-semibold transition shadow-lg flex justify-center items-center"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="animate-spin w-5 h-5 mr-2" />
//                 Submitting...
//               </>
//             ) : (
//               "Submit Details"
//             )}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ClientDetailForm;
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { GoogleSheetService } from "@/utils/googleSheetService";
import { sendEmailViaServer } from "@/utils/sendemail";

const InputClass = "mt-2 w-full rounded-lg border-2 border-gray-400 px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white";
const LabelClass = "text-sm font-bold text-black";
const SectionTitleClass = "md:col-span-2 text-xl font-extrabold text-black/80 mt-6 border-t pt-6";

// Define the options/constants needed for JSX (copied from LandingPage.jsx)
const INDUSTRY_OPTIONS = [
  "Real Estate",
  "Construction",
  "Recruitment",
  "Bookkeeping",
  "Mortgage Broking",
  "IT / Technology",
  "Marketing",
  "Other",
];
const SUPPORT_REQUIRED_OPTIONS = [
  "General Admin Tasks",
  "Email & Calendar Management",
  "Data Entry",
  "CRM Updates",
  "Invoicing / Accounts Admin",
  "Document Preparation",
  "Social Media Support",
  "Client Communication",
  "Bookkeeping Support",
  "Other",
];
const START_DATE_OPTIONS = ["ASAP", "Within 1 week", "Within 2–4 weeks", "Flexible"];
const EMPLOYMENT_TYPE_OPTIONS = ["Full-time", "Part-time", "Casual / Project-based"];
const PART_TIME_SHIFT_OPTIONS = [
  "Morning shift (9.30am to 1.30pm)",
  "Afternoon shift (1.30pm to 5.30pm)",
  "Flexible",
];
const TIME_OVERLAP_OPTIONS = ["9am–12pm", "9am–3pm", "Full-day", "Flexible"];
const YES_NO_OPTIONS = ["Yes", "No"];

// Define software categories needed for JSX (copied from LandingPage.jsx)
const SOFTWARE_CATEGORIES = {
  "Office & Communication": [
    "Google Workspace",
    "Microsoft Office",
    "Slack",
    "Teams",
  ],
  "CRM / Project Management": [
    "HubSpot",
    "Salesforce",
    "Zoho",
    "Trello",
    "Asana",
    "Monday.com",
    "JobAdder",
    "Bullhorn",
    "Manatal",
    "PropertyMe",
    "PropertyTree",
    "Eagle CRM",
  ],
  "Accounting": ["Xero", "MYOB", "QuickBooks", "Reckon"],
  "Marketing / Design": [
    "Canva",
    "Mailchimp",
    "Meta Business Suite",
  ],
};

// Define task lists needed for JSX (copied from LandingPage.jsx)
const GENERAL_ADMIN_TASKS = [
  "Managing emails and responding to queries",
  "Calendar scheduling & reminders",
  "Data entry & spreadsheet updates",
  "Document creation, formatting & filing",
  "Preparing reports, trackers & logs",
  "CRM updates and data hygiene",
  "Invoicing, billing checks, basic accounts admin",
  "Research (industry, competitors, pricing, tools)",
  "Drafting SOPs, templates and internal documents",
  "Preparing meeting notes and summaries",
  "Coordinating appointments and follow-ups",
];
const SOCIAL_MEDIA_TASKS = [
  "Creating posts using Canva",
  "Scheduling posts on LinkedIn, Instagram, Facebook",
  "Responding to comments/messages",
  "Basic competitor research & idea generation",
  "Preparing monthly content calendars",
  "Monitoring analytics & preparing reports",
  "Drafting captions & hashtags",
  "Uploading stories, highlights & updates",
  "Managing Meta Business Suite tasks",
];
const BOOKKEEPING_TASKS = [
  "Accounts Payable & Receivable (invoicing, follow-ups)",
  "Bank Reconciliation",
  "Monthly/Quarterly Financial Reports",
  "BAS Preparation & GST Calculations",
  "Payroll Processing",
  "Expense Tracking & Categorisation",
  "Tax Preparation & Compliance Support",
  "Managing Client Accounts & Outstanding Balances",
  "Cloud-based Accounting Software Management",
  "Daily Transaction Entry",
  "Accounts Reconciliation",
  "Budgeting & Forecasting Support",
  "Documentation & Record-Keeping",
  "Client Communication (invoices, payments)",
  "Regulatory & Compliance Support",
];
const MARKETING_CONTENT_TASKS = [
  "Content creation (blogs, posts, website copy)",
  "Social media content planning & publishing",
  "Email marketing support (newsletters, campaign setup)",
  "Basic SEO support (keyword checks, metadata updates)",
  "Lead generation support (landing pages, form setup)",
  "Community engagement & brand support",
  "Digital marketing coordination",
  "Campaign monitoring & basic reporting",
  "Updating website content (minor edits, uploads)",
  "Market & competitor research",
];
const WEBSITE_SEO_TASKS = [
  "Website updates (content uploads, formatting)",
  "Basic on-page SEO (titles, meta descriptions)",
  "SEO keyword support",
  "Image optimisation & alt text updates",
  "Website audits (broken links, page checks)",
  "Landing page updates",
];
const EMAIL_MARKETING_TASKS = [
  "Email campaign creation",
  "Newsletter drafting & formatting",
  "Email automation setup",
  "Subscriber list management & segmentation",
  "Campaign scheduling & optimisation",
  "Monitoring performance (open rates, click-through rates)",
  "Ensuring compliance with email marketing guidelines",
];
// --- End of constants from LandingPage.jsx ---


const ClientDetailForm = () => {
  const { clientLead, setClientLead, isLoading, setIsLoading, message, setMessage, } = useAppContext();
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  const isNewClientFlow = idParam === "new" && !clientLead;

  const [formData, setFormData] = useState({
    // Basic Contact Information
    name: clientLead?.name || "",
    email: clientLead?.email || "",
    phone: clientLead?.phone || "",
    company: clientLead?.company || "",
    businessWebsite: clientLead?.businessWebsite || "",

    // Business Information
    industrySector: clientLead?.industrySector || "",
    industrySectorOther: clientLead?.industrySectorOther || "",
    businessDescription: clientLead?.businessDescription || "",

    // Support Requirements
    supportRequired: clientLead?.supportRequired || [],
    supportRequiredOther: clientLead?.supportRequiredOther || "",

    // Task selections
    generalAdminTasks: clientLead?.generalAdminTasks || [],
    socialMediaManagementTasks: clientLead?.socialMediaManagementTasks || [],
    bookkeepingTasks: clientLead?.bookkeepingTasks || [],
    marketingContentTasks: clientLead?.marketingContentTasks || [],
    websiteSEOTasks: clientLead?.websiteSEOTasks || [],
    emailMarketingTasks: clientLead?.emailMarketingTasks || [],
    
    // 💡 NEW FIELD ADDED FROM LANDINGPAGE SECTION 3
    otherTaskRequirements: clientLead?.otherTaskRequirements || "",
    
    // Software by category
    keyToolsAndSoftwareOffice: clientLead?.keyToolsAndSoftwareOffice || [],
    keyToolsAndSoftwareOtherOffice: clientLead?.keyToolsAndSoftwareOtherOffice || "",
    keyToolsAndSoftwareCRM: clientLead?.keyToolsAndSoftwareCRM || [],
    keyToolsAndSoftwareOtherCRM: clientLead?.keyToolsAndSoftwareOtherCRM || "",
    keyToolsAndSoftwareAccounting: clientLead?.keyToolsAndSoftwareAccounting || [],
    keyToolsAndSoftwareOtherAccounting: clientLead?.keyToolsAndSoftwareOtherAccounting || "",
    keyToolsAndSoftwareMarketing: clientLead?.keyToolsAndSoftwareMarketing || [],
    keyToolsAndSoftwareOtherMarketing: clientLead?.keyToolsAndSoftwareOtherMarketing || "",

    // Workload & Availability
    expectedStartDate: clientLead?.expectedStartDate || "",
    employmentType: clientLead?.employmentType || "",
    preferredShift: clientLead?.preferredShift || "",
    preferredTimeOverlap: clientLead?.preferredTimeOverlap || "",
    budgetRange: clientLead?.budgetRange || "",
    genderPreference: clientLead?.genderPreference || "",

    // Required Skills & Experience
    specificSkillSets: clientLead?.specificSkillSets || "",
    industryExperienceRequired: clientLead?.industryExperienceRequired || "",
    industryExperienceDetails: clientLead?.industryExperienceDetails || "",

    // Training & Compliance
    trainingProvided: clientLead?.trainingProvided || "",
    ndaRequired: clientLead?.ndaRequired || "",
    complianceRequirements: clientLead?.complianceRequirements || "",

    // Discovery Call
    discoveryCallRequired: clientLead?.discoveryCallRequired || "",
    preferredCallTime: clientLead?.preferredCallTime || "",

    // Final Message/Notes
    message: clientLead?.message || "",
  });

  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  // Helper for all form input changes (text, select, textarea)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      // Keep conditional logic for clearing related fields
      if (name === "industrySector" && value !== "Other") next.industrySectorOther = "";
      if (name === "industryExperienceRequired" && value !== "Yes") next.industryExperienceDetails = "";
      if (name === "employmentType" && value !== "Part-time") next.preferredShift = "";
      if (name === "discoveryCallRequired" && value !== "Yes") next.preferredCallTime = "";
      return next;
    });
  };

  // Helper for single-value checkbox arrays (like supportRequired)
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const set = new Set(prev.supportRequired || []);
      if (checked) {
        set.add(value);
      } else {
        set.delete(value);
        // Clear the "Other" text field when "Other" checkbox is unchecked
        if (value === "Other") {
          return { ...prev, supportRequired: Array.from(set), supportRequiredOther: "" };
        }
      }
      return { ...prev, supportRequired: Array.from(set) };
    });
  };

  // Helper for task checkbox arrays
  const handleTaskCheckboxChange = (fieldName) => (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const set = new Set(prev[fieldName] || []);
      if (checked) {
        set.add(value);
      } else {
        set.delete(value);
      }
      return { ...prev, [fieldName]: Array.from(set) };
    });
  };
  
  // New generic handler for software checkboxes in Section 6
  const handleSoftwareCategoryChange = (fieldName, specialValue, otherFieldName) => (e) => {
    const { value, checked } = e.target;

    // Handle regular software items
    if (value !== specialValue) {
      setFormData((prev) => {
        const set = new Set(prev[fieldName] || []);
        if (checked) set.add(value);
        else set.delete(value);
        return { ...prev, [fieldName]: Array.from(set) };
      });
      return;
    }
    
    // Handle the "Other" checkbox
    setFormData((prev) => {
        const set = new Set(prev[fieldName] || []);
        if (checked) {
            set.add(specialValue);
        } else {
            set.delete(specialValue);
            // Clear the corresponding "Other" text field when unchecked
            return { ...prev, [fieldName]: Array.from(set), [otherFieldName]: "" };
        }
        return { ...prev, [fieldName]: Array.from(set) };
    });
  };

  // Skip the tool setup logic if not editing an existing client
  if (!clientLead && !isNewClientFlow) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Invalid client link or missing data.</p>
      </div>
    );
  }

  // Submission handler for existing clients (update via Google Sheet)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Pass all form data to the update function, including the new field
      await GoogleSheetService.updateRow(clientLead.id, formData);

      // Keeping only the success message and navigation for this submission type
      setMessage({ text: "Your details have been updated successfully!", emailContent: null });
      setTimeout(() => window.history.pushState({}, "", "/"), 3000);
    } catch (error) {
      console.error("Error updating requirements:", error);
      setMessage({
        text: "Something went wrong. Please try again later.",
        emailContent: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for new-client submissions (when routed to ?view=client&id=new)
  const handleNewClientSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingNew(true);

    try {
      // Create a concatenated list of all software for the payload
      const allSoftware = [
        ...(formData.keyToolsAndSoftwareOffice || []),
        ...(formData.keyToolsAndSoftwareCRM || []),
        ...(formData.keyToolsAndSoftwareAccounting || []),
        ...(formData.keyToolsAndSoftwareMarketing || []),
      ];

      // Clean up special "Other_Specify_*" markers and add the text field content instead
      const keyToolsAndSoftwareList = allSoftware.filter(item => !item.startsWith('Other_Specify_'));

      if (formData.keyToolsAndSoftwareOtherOffice) keyToolsAndSoftwareList.push(`Other Office: ${formData.keyToolsAndSoftwareOtherOffice}`);
      if (formData.keyToolsAndSoftwareOtherCRM) keyToolsAndSoftwareList.push(`Other CRM: ${formData.keyToolsAndSoftwareOtherCRM}`);
      if (formData.keyToolsAndSoftwareOtherAccounting) keyToolsAndSoftwareList.push(`Other Accounting: ${formData.keyToolsAndSoftwareOtherAccounting}`);
      if (formData.keyToolsAndSoftwareOtherMarketing) keyToolsAndSoftwareList.push(`Other Marketing: ${formData.keyToolsAndSoftwareOtherMarketing}`);

      const leadToSave = {
        ...formData,
        // Override the separate arrays with one consolidated list for the API payload
        keyToolsAndSoftware: keyToolsAndSoftwareList, 
        
        date: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString(),
      };


      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadToSave),
      });

      if (res.ok) {
        setMessage({ text: "Your request has been submitted. We'll contact you shortly!", emailContent: null });
        setTimeout(() => window.history.pushState({}, "", "/"), 1200);
      } else {
        setMessage({ text: "Error submitting. Please try again.", emailContent: null });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Connection error. Please try again later.", emailContent: null });
    } finally {
      setIsSubmittingNew(false);
    }
  };


  // --- JSX for New Client Flow ---
  if (isNewClientFlow) {
    return (
      <section className="pt-10 pb-20 px-6 md:px-10 bg-gray-50">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Get Started — Submit Your Requirements
          </h2>

          {message.text && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center mb-4">
              <p>{message.text}</p>
            </div>
          )}

          <form onSubmit={handleNewClientSubmit} className="grid gap-6 md:grid-cols-2">
          {/* </form> <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}> */}
                <h3 className={SectionTitleClass}>1. Business Information</h3>

                {/* ... Section 1 JSX remains the same ... */}

                <div>
                  <label className={LabelClass}>Primary Contact Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={InputClass} placeholder="John Doe" />
                </div>

                <div>
                  <label className={LabelClass}>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={InputClass} placeholder="john@company.com" />
                </div>

                <div>
                  <label className={LabelClass}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className={InputClass} placeholder="+1 (555) 000-0000" />
                </div>

                <div>
                  <label className={LabelClass}>Business Name *</label>
                  <input type="text" name="company" value={formData.company} onChange={handleInputChange} required className={InputClass} placeholder="Your Company Inc." />
                </div>

                <div>
                  <label className={LabelClass}>Business Website</label>
                  <input type="url" name="businessWebsite" value={formData.businessWebsite} onChange={handleInputChange} className={InputClass} placeholder="https://www.yourcompany.com" />
                </div>

                <div>
                  <label className={LabelClass}>Industry / Sector *</label>
                  <select name="industrySector" value={formData.industrySector} onChange={handleInputChange} required className={InputClass}>
                    <option value="">Select industry</option>
                    {INDUSTRY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {formData.industrySector === "Other" && (
                  <div className="md:col-span-2">
                    <label className={LabelClass}>Specify Other Industry</label>
                    <input type="text" name="industrySectorOther" value={formData.industrySectorOther} onChange={handleInputChange} className={InputClass} placeholder="e.g., Veterinary Services" />
                  </div>
                )}

                <h3 className={SectionTitleClass}>2. About Your Business</h3>

                <div className="md:col-span-2">
                  <label className={LabelClass}>Brief description of your business *</label>
                  <textarea name="businessDescription" value={formData.businessDescription} onChange={handleInputChange} rows="3" required className={InputClass} placeholder="e.g., We are a boutique real estate agency..." />
                </div>

                <div className="md:col-span-2">
                  <label className={LabelClass}>Support Required (Select all that apply)</label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SUPPORT_REQUIRED_OPTIONS.map((s) => (
                      <label key={s} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input 
                          type="checkbox" 
                          value={s} 
                          checked={formData.supportRequired.includes(s)} 
                          onChange={handleCheckboxChange} 
                          className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300" 
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                  
                  {formData.supportRequired.includes("Other") && (
                    <div className="mt-3">
                      <input 
                        type="text" 
                        name="supportRequiredOther" 
                        value={formData.supportRequiredOther} 
                        onChange={handleInputChange} 
                        className={InputClass}
                        placeholder="Please specify other support required..." 
                      />
                    </div>
                  )}
                </div>

                {/* This large keyToolsAndSoftware div was deprecated and should be removed if the new Section 6 is used. It is being kept as is in the original file for now, but this section is being skipped for the task. */}
                {/* <div className="md:col-span-2">...</div> */}

                <h3 className={SectionTitleClass}>3. General List of Tasks</h3>

                  <div className="md:col-span-2">
                      <label className={LabelClass}>General Admin Tasks (Select all that apply)</label>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {GENERAL_ADMIN_TASKS.map((task) => (
                        <label key={task} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          value={task}
                          checked={formData.generalAdminTasks.includes(task)}
                          onChange={handleTaskCheckboxChange('generalAdminTasks')}
                          className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                         />
                          <span>{task}</span>
                          </label>
                         ))}
                       </div>
                  </div>

                
                  <div className="md:col-span-2">
                    <label className={LabelClass}>Social Media Management (Select all that apply)</label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SOCIAL_MEDIA_TASKS.map((task) => (
                        <label key={task} className="flex items-center space-x-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            value={task}
                            checked={formData.socialMediaManagementTasks.includes(task)}
                            onChange={handleTaskCheckboxChange('socialMediaManagementTasks')}
                            className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                          />
                          <span>{task}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className={LabelClass}>Bookkeeping Tasks (Select all that apply)</label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BOOKKEEPING_TASKS.map((task) => (
                        <label key={task} className="flex items-center space-x-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            value={task}
                            checked={formData.bookkeepingTasks.includes(task)}
                            onChange={handleTaskCheckboxChange('bookkeepingTasks')}
                            className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                          />
                          <span>{task}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                <div className="md:col-span-2">
                  <label className={LabelClass}>Marketing & Content Support (Select all that apply)</label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MARKETING_CONTENT_TASKS.map((task) => (
                      <label key={task} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          value={task}
                          checked={formData.marketingContentTasks.includes(task)}
                          onChange={handleTaskCheckboxChange('marketingContentTasks')}
                          className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                        />
                        <span>{task}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={LabelClass}>Website & SEO Support (Select all that apply)</label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {WEBSITE_SEO_TASKS.map((task) => (
                      <label key={task} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          value={task}
                          checked={formData.websiteSEOTasks.includes(task)}
                          onChange={handleTaskCheckboxChange('websiteSEOTasks')}
                          className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                        />
                        <span>{task}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={LabelClass}>Email Marketing Support (Select all that apply)</label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EMAIL_MARKETING_TASKS.map((task) => (
                      <label key={task} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          value={task}
                          checked={formData.emailMarketingTasks.includes(task)}
                          onChange={handleTaskCheckboxChange('emailMarketingTasks')}
                          className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                        />
                        <span>{task}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* START OF CHANGE 1: Other Task Requirements Text Field */}
                <div className="md:col-span-2">
                  <label className={LabelClass}>Other Task Requirements</label>
                  <textarea 
                    name="otherTaskRequirements" 
                    value={formData.otherTaskRequirements || ""} 
                    onChange={handleInputChange} 
                    rows="3" 
                    className={InputClass} 
                    placeholder="e.g., Support required for Xero Payroll, specific lead nurturing automation steps, etc." 
                  />
                </div>
                {/* END OF CHANGE 1 */}

                <h3 className={SectionTitleClass}>4. Workload & Availability</h3>
                
                {/* ... Section 4 JSX remains the same ... */}
                
                {/* <div>
                  <label className={LabelClass}>Expected Start Date *</label>
                  <select name="expectedStartDate" value={formData.expectedStartDate} onChange={handleInputChange} required className={InputClass}>
                    <option value="">Select date range</option>
                    {START_DATE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div> */}

                <div>
                  <label className={LabelClass}>Hours Required *</label>
                  <select name="employmentType" value={formData.employmentType} onChange={handleInputChange} required className={InputClass}>
                    <option value="">Select type</option>
                    {EMPLOYMENT_TYPE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {formData.employmentType === "Part-time" && (
                  <div>
                    <label className={LabelClass}>Preferred Part-time Shift</label>
                    <select name="preferredShift" value={formData.preferredShift} onChange={handleInputChange} className={InputClass}>
                      <option value="">Select shift</option>
                      {PART_TIME_SHIFT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                )}

                {/* <div>
                  <label className={LabelClass}>Preferred Time Overlap *</label>
                  <select name="preferredTimeOverlap" value={formData.preferredTimeOverlap} onChange={handleInputChange} required className={InputClass}>
                    <option value="">Select overlap</option>
                    {TIME_OVERLAP_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div> */}

                {/* <div>
                  <label className={LabelClass}>Budget / Price Range (Est.) *</label>
                  <input type="text" name="budgetRange" value={formData.budgetRange} onChange={handleInputChange} required className={InputClass} placeholder="e.g., $5,000 - $10,000" />
                </div> */}

                <div>
                  <label className={LabelClass}>Gender Preference</label>
                  <select name="genderPreference" value={formData.genderPreference} onChange={handleInputChange} className={InputClass}>
                    <option value="">Select preference</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Not specific</option>
                  </select>
                </div>

                <h3 className={SectionTitleClass}>5. Required Skills & Experience</h3>

                <div className="md:col-span-2">
                  <label className={LabelClass}>Specific Skill Sets Required</label>
                  <textarea name="specificSkillSets" value={formData.specificSkillSets} onChange={handleInputChange} rows="2" className={InputClass} placeholder="e.g., Advanced Excel, HubSpot administration..." />
                </div>

                {/* ... Removed optional Industry Experience fields for brevity if not needed ... */}

                <div className="md:col-span-2 mt-8">
                  <label className={LabelClass}>Additional Notes / Message</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" className={InputClass} placeholder="Any other information that is important for us to know." />
                </div>

                <h3 className={SectionTitleClass}>6. Tools, Software & Systems</h3>

                {/* START OF CHANGE 2: Office & Communication with fixed "Other" logic */}
                <div className="md:col-span-2">
                  <label className={LabelClass}>Office & Communication</label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SOFTWARE_CATEGORIES["Office & Communication"].map((item) => (
                      <label key={item} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          value={item}
                          checked={formData.keyToolsAndSoftwareOffice.includes(item)}
                          onChange={handleSoftwareCategoryChange('keyToolsAndSoftwareOffice', 'Other_Specify_Office', 'keyToolsAndSoftwareOtherOffice')}
                          className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value="Other_Specify_Office" // Use a unique value to track checkbox state
                        checked={formData.keyToolsAndSoftwareOffice.includes('Other_Specify_Office')}
                        onChange={handleSoftwareCategoryChange('keyToolsAndSoftwareOffice', 'Other_Specify_Office', 'keyToolsAndSoftwareOtherOffice')}
                        className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                      />
                      <span>Other</span>
                    </label>
                  </div>
                  {/* Conditional render of input field */}
                  {formData.keyToolsAndSoftwareOffice.includes('Other_Specify_Office') && (
                    <input
                      type="text"
                      name="keyToolsAndSoftwareOtherOffice"
                      value={formData.keyToolsAndSoftwareOtherOffice || ""}
                      onChange={handleInputChange}
                      className="mt-2 w-full rounded-lg border px-2 py-1 text-sm"
                      placeholder="Specify other office software..."
                    />
                  )}
                </div>
                {/* END OF CHANGE 2: Office & Communication */}


                {/* START OF CHANGE 2: CRM / Project Management with fixed "Other" logic */}
                <div className="md:col-span-2">
                  <label className={LabelClass}>CRM / Project Management</label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SOFTWARE_CATEGORIES["CRM / Project Management"].map((item) => (
                      <label key={item} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          value={item}
                          checked={formData.keyToolsAndSoftwareCRM.includes(item)}
                          onChange={handleSoftwareCategoryChange('keyToolsAndSoftwareCRM', 'Other_Specify_CRM', 'keyToolsAndSoftwareOtherCRM')}
                          className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value="Other_Specify_CRM"
                        checked={formData.keyToolsAndSoftwareCRM.includes('Other_Specify_CRM')}
                        onChange={handleSoftwareCategoryChange('keyToolsAndSoftwareCRM', 'Other_Specify_CRM', 'keyToolsAndSoftwareOtherCRM')}
                        className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                      />
                      <span>Other</span>
                    </label>
                  </div>
                  {/* Conditional render of input field */}
                  {formData.keyToolsAndSoftwareCRM.includes('Other_Specify_CRM') && (
                    <input
                      type="text"
                      name="keyToolsAndSoftwareOtherCRM"
                      value={formData.keyToolsAndSoftwareOtherCRM || ""}
                      onChange={handleInputChange}
                      className="mt-2 w-full rounded-lg border px-2 py-1 text-sm"
                      placeholder="Specify other CRM..."
                    />
                  )}
                </div>
                {/* END OF CHANGE 2: CRM / Project Management */}

                
                {/* START OF CHANGE 2: Accounting with fixed "Other" logic */}
                <div className="md:col-span-2">
                  <label className={LabelClass}>Accounting</label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SOFTWARE_CATEGORIES["Accounting"].map((item) => (
                      <label key={item} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          value={item}
                          checked={formData.keyToolsAndSoftwareAccounting.includes(item)}
                          onChange={handleSoftwareCategoryChange('keyToolsAndSoftwareAccounting', 'Other_Specify_Accounting', 'keyToolsAndSoftwareOtherAccounting')}
                          className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value="Other_Specify_Accounting"
                        checked={formData.keyToolsAndSoftwareAccounting.includes('Other_Specify_Accounting')}
                        onChange={handleSoftwareCategoryChange('keyToolsAndSoftwareAccounting', 'Other_Specify_Accounting', 'keyToolsAndSoftwareOtherAccounting')}
                        className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                      />
                      <span>Other</span>
                    </label>
                  </div>
                  {/* Conditional render of input field */}
                  {formData.keyToolsAndSoftwareAccounting.includes('Other_Specify_Accounting') && (
                    <input
                      type="text"
                      name="keyToolsAndSoftwareOtherAccounting"
                      value={formData.keyToolsAndSoftwareOtherAccounting || ""}
                      onChange={handleInputChange}
                      className="mt-2 w-full rounded-lg border px-2 py-1 text-sm"
                      placeholder="Specify other accounting software..."
                    />
                  )}
                </div>
                {/* END OF CHANGE 2: Accounting */}

                
                {/* START OF CHANGE 2: Marketing / Design with fixed "Other" logic */}
                <div className="md:col-span-2">
                  <label className={LabelClass}>Marketing / Design</label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SOFTWARE_CATEGORIES["Marketing / Design"].map((item) => (
                      <label key={item} className="flex items-center space-x-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          value={item}
                          checked={formData.keyToolsAndSoftwareMarketing.includes(item)}
                          onChange={handleSoftwareCategoryChange('keyToolsAndSoftwareMarketing', 'Other_Specify_Marketing', 'keyToolsAndSoftwareOtherMarketing')}
                          className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value="Other_Specify_Marketing"
                        checked={formData.keyToolsAndSoftwareMarketing.includes('Other_Specify_Marketing')}
                        onChange={handleSoftwareCategoryChange('keyToolsAndSoftwareMarketing', 'Other_Specify_Marketing', 'keyToolsAndSoftwareOtherMarketing')}
                        className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300"
                      />
                      <span>Other</span>
                    </label>
                  </div>
                  {/* Conditional render of input field */}
                  {formData.keyToolsAndSoftwareMarketing.includes('Other_Specify_Marketing') && (
                    <input
                      type="text"
                      name="keyToolsAndSoftwareOtherMarketing"
                      value={formData.keyToolsAndSoftwareOtherMarketing || ""}
                      onChange={handleInputChange}
                      className="mt-2 w-full rounded-lg border px-2 py-1 text-sm"
                      placeholder="Specify other marketing tool..."
                    />
                  )}
                </div>
                {/* END OF CHANGE 2: Marketing / Design */}

<h3 className={SectionTitleClass}>7. Training, Access & Compliance</h3>

<div>
  <label className={LabelClass}>Will you provide internal process training?</label>
  <select
    name="trainingProvided"
    value={formData.trainingProvided}
    onChange={handleInputChange}
    className={InputClass}
  >
    <option value="">Select option</option>
    <option>Yes</option>
    <option>No</option>
  </select>
</div>

<div>
  <label className={LabelClass}>Do you require an NDA?</label>
  <select
    name="ndaRequired"
    value={formData.ndaRequired}
    onChange={handleInputChange}
    className={InputClass}
  >
    <option value="">Select option</option>
    <option>Yes</option>
    <option>No</option>
    <option>Not sure</option>
  </select>
</div>

<div className="md:col-span-2">
  <label className={LabelClass}>Any compliance/security requirements</label>
  <textarea
    name="complianceRequirements"
    value={formData.complianceRequirements}
    onChange={handleInputChange}
    rows="2"
    className={InputClass}
    placeholder="Describe any compliance or security requirements..."
  />
</div>

<h3 className={SectionTitleClass}>8. Discovery Call</h3>

<div>
  <label className={LabelClass}>Would you like a discovery call?</label>
  <select
    name="discoveryCallRequired"
    value={formData.discoveryCallRequired}
    onChange={handleInputChange}
    className={InputClass}
  >
    <option value="">Select option</option>
    <option>Yes</option>
    <option>No</option>
  </select>
</div>

{formData.discoveryCallRequired === "Yes" && (
  <div>
    <label className={LabelClass}>Preferred call time</label>
    <select
      name="preferredCallTime"
      value={formData.preferredCallTime}
      onChange={handleInputChange}
      className={InputClass}
    >
      <option value="">Select time</option>
      <option>Morning</option>
      <option>Afternoon</option>
      <option>Flexible</option>
    </select>
  </div>
)}

<div className="md:col-span-2 mt-8">
                  <label className={LabelClass}>Additional Notes / Message</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" className={InputClass} placeholder="Any other information that is important for us to know." />
                </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmittingNew}
                className="w-full rounded-lg bg-yellow-400 py-4 text-black font-bold text-lg hover:bg-yellow-500 transition shadow-md disabled:bg-gray-400"
              >
                {isSubmittingNew ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  // --- JSX for Existing Client Flow ---
  return (
    <section className="pt-10 pb-20 px-6 md:px-10 bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Update Project Details
        </h2>

        {message.text && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center mb-4">
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 💡 NEW FIELD: otherTaskRequirements in Existing Client Flow */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Other Task Requirements / Notes (Your "me field" Update)
            </label>
            <textarea
              rows="3"
              name="otherTaskRequirements"
              value={formData.otherTaskRequirements}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              placeholder="Update the other task requirements / notes..."
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Additional Requirements / Updates (General Message)
            </label>
            <textarea
              required
              rows="6"
              name="message" // Using 'message' as the main free-text field for updates here.
              value={formData.message}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
              placeholder="Describe any updates or additional requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 font-semibold transition shadow-lg flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                Submitting...
              </>
            ) : (
              "Update Details"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ClientDetailForm;