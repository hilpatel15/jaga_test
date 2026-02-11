// import React, { useState } from "react";
// import { useAppContext } from "@/context/AppContext";
// import Header from "@/components/layouts/Header";
// import Footer from "@/components/layouts/Footer";
// import { CheckCircle2 } from "lucide-react";

// const SERVICES = [
//   "Administrative Support",
//   "Customer Service",
//   "24/7 Availability",
//   "Social Media Management",
//   "Email & Calendar Management",
//   "Executive Assistance",
// ];

// const INDUSTRY_OPTIONS = [
//   "Real Estate",
//   "Construction",
//   "Recruitment",
//   "Bookkeeping",
//   "Mortgage Broking",
//   "IT / Technology",
//   "Marketing",
//   "Other",
// ];

// const SUPPORT_REQUIRED_OPTIONS = [
//   "Email & calendar management",
//   "Data entry",
//   "CRM updates",
//   "Invoicing / accounts admin",
//   "Document preparation",
//   "Social media support",
//   "Client communication",
//   "Recruitment admin",
//   "Property admin",
//   "General admin tasks",
// ];

// const START_DATE_OPTIONS = ["ASAP", "Within 1 week", "Within 2–4 weeks", "Flexible"];
// const EMPLOYMENT_TYPE_OPTIONS = ["Full-time", "Part-time", "Casual / Project-based"];
// const PART_TIME_SHIFT_OPTIONS = [
//   "Morning shift (9.30am to 1.30pm)",
//   "Afternoon shift (1.30pm to 5.30pm)",
//   "Flexible",
// ];
// const TIME_OVERLAP_OPTIONS = ["9am–12pm", "9am–3pm", "Full-day", "Flexible"];
// const YES_NO_OPTIONS = ["Yes", "No"];
// const CALL_TIME_OPTIONS = ["Morning", "Afternoon", "Flexible"];

// const initialFormState = {
//   name: "",
//   email: "",
//   phone: "",
//   company: "",
//   businessWebsite: "",
//   industrySector: "",
//   industrySectorOther: "",
//   businessDescription: "",
//   supportRequired: [],
//   supportRequiredOther: "",
//   expectedStartDate: "",
//   employmentType: "",
//   preferredShift: "",
//   preferredTimeOverlap: "",
//   specificSkillSets: "",
//   industryExperienceRequired: "",
//   industryExperienceDetails: "",
//   keyToolsAndSoftware: "",
//   processTrainingProvided: "",
//   ndaRequired: "",
//   complianceRequirements: "",
//   message: "",
//   budgetRange: "",
//   genderPreference: "",
//   discoveryCall: "",
//   preferredCallTime: "",
// };

// const InputClass = "mt-2 w-full rounded-lg border-2 border-gray-400 px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white";
// const LabelClass = "text-sm font-bold text-black";
// const SectionTitleClass = "md:col-span-2 text-xl font-extrabold text-black/80 mt-6 border-t pt-6";

// const LandingPage = () => {
//   const { addLead } = useAppContext();
//   const [formData, setFormData] = useState(initialFormState);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const next = { ...prev, [name]: value };
//       if (name === "industrySector" && value !== "Other") next.industrySectorOther = "";
//       if (name === "industryExperienceRequired" && value !== "Yes") next.industryExperienceDetails = "";
//       if (name === "employmentType" && value !== "Part-time") next.preferredShift = "";
//       if (name === "discoveryCall" && value !== "Yes") next.preferredCallTime = "";
//       return next;
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prev) => {
//       const set = new Set(prev.supportRequired || []);
//       if (checked) set.add(value);
//       else set.delete(value);
//       return { ...prev, supportRequired: Array.from(set) };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const leadToSave = {
//         ...formData,
//         date: new Date().toLocaleDateString(),
//         createdAt: new Date().toISOString(),
//       };

//       console.log("Submitting lead to server:", leadToSave);

//       if (addLead) {
//         const res = await addLead(leadToSave);
//       } else {
//         const raw = localStorage.getItem("jaga:leads");
//         const arr = raw ? JSON.parse(raw) : [];
//         arr.unshift({ id: Date.now().toString(), ...leadToSave });
//         localStorage.setItem("jaga:leads", JSON.stringify(arr));
//         console.log("DEBUG: LandingPage saved to localStorage fallback");
//       }

//       setSubmitMessage("✅ Thank you! Your request has been submitted successfully. We'll contact you within 24 hours.");
//       setFormData(initialFormState); // reset correctly
//     } catch (error) {
//       console.error("Form submission error:", error);
//       setSubmitMessage("❌ Error submitting form. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//       setTimeout(() => setSubmitMessage(""), 6000);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <main className="bg-white text-black">
//         <section className="relative overflow-hidden bg-yellow-400" style={{ backgroundSize: "cover", backgroundPosition: "center" }}>
//           <div className="max-w-6xl mx-auto px-6 py-32 text-black">
//             <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-3xl">
//               Expert Virtual Assistant Services for Your Business
//             </h1>
//             <p className="text-xl md:text-2xl text-black/80 mt-6 max-w-2xl leading-relaxed">
//               Streamline your operations with dedicated professionals. Focus on what matters while we handle the rest.
//             </p>
//             <div className="flex flex-wrap gap-4 mt-12">
//               <button
//                 onClick={() => {
//                   const formSection = document.getElementById("contact-form");
//                   if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
//                 }}
//                 className="px-8 py-4 rounded-lg bg-black text-white font-bold text-lg hover:bg-gray-900 transition shadow-lg"
//               >
//                 Get Started Today
//               </button>
//             </div>
//           </div>
//         </section>

//         <section className="max-w-6xl mx-auto px-6 py-20" id="services">
//           <div className="text-center max-w-2xl mx-auto">
//             <h2 className="text-4xl font-black mt-3 text-black">Our Virtual Assistant Services</h2>
//             <p className="text-gray-700 mt-3 text-lg">Comprehensive support solutions tailored to your business needs</p>
//           </div>
//           <div className="grid gap-6 md:grid-cols-3 mt-14">
//             {SERVICES.map((s) => (
//               <div key={s} className="rounded-lg border-2 border-black bg-white p-8 shadow-md hover:shadow-lg transition">
//                 <div className="w-14 h-14 rounded-full bg-yellow-400 text-black flex items-center justify-center mb-5 font-bold text-2xl">🏢</div>
//                 <h3 className="text-lg font-bold text-black">{s}</h3>
//                 <p className="text-gray-700 mt-3">Professional {s.toLowerCase()}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="bg-gray-50 py-24 px-6" id="contact-form">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-4xl font-black text-center text-black">Get Started Today</h2>
//             <p className="text-gray-700 text-center mt-4 text-lg">Please fill out the details below so we can match you with the perfect professional.</p>

//             <div className="bg-white rounded-lg border-2 border-black shadow-lg p-10 mt-12">
//               <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
//                 {submitMessage && (
//                   <div
//                     className="md:col-span-2 p-4 rounded-lg text-center font-semibold"
//                     style={{
//                       backgroundColor: submitMessage.includes("✅") ? "#dcfce7" : "#fee2e2",
//                       color: submitMessage.includes("✅") ? "#166534" : "#991b1b",
//                     }}
//                   >
//                     {submitMessage}
//                   </div>
//                 )}

//                 <h3 className={SectionTitleClass}>1. Business Information</h3>

//                 <div>
//                   <label className={LabelClass}>Primary Contact Name</label>
//                   <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={InputClass} placeholder="John Doe" />
//                 </div>

//                 <div>
//                   <label className={LabelClass}>Email Address</label>
//                   <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={InputClass} placeholder="john@company.com" />
//                 </div>

//                 <div>
//                   <label className={LabelClass}>Phone Number</label>
//                   <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className={InputClass} placeholder="+1 (555) 000-0000" />
//                 </div>

//                 <div>
//                   <label className={LabelClass}>Business Name</label>
//                   <input type="text" name="company" value={formData.company} onChange={handleInputChange} required className={InputClass} placeholder="Your Company Inc." />
//                 </div>

//                 <div>
//                   <label className={LabelClass}>Business Website</label>
//                   <input type="url" name="businessWebsite" value={formData.businessWebsite} onChange={handleInputChange} className={InputClass} placeholder="https://www.yourcompany.com" />
//                 </div>

//                 <div>
//                   <label className={LabelClass}>Industry / Sector</label>
//                   <select name="industrySector" value={formData.industrySector} onChange={handleInputChange} required className={InputClass}>
//                     <option value="">Select industry</option>
//                     {INDUSTRY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                   </select>
//                 </div>

//                 {formData.industrySector === "Other" && (
//                   <div className="md:col-span-2">
//                     <label className={LabelClass}>Specify Other Industry</label>
//                     <input type="text" name="industrySectorOther" value={formData.industrySectorOther} onChange={handleInputChange} className={InputClass} placeholder="e.g., Veterinary Services" />
//                   </div>
//                 )}

//                 <h3 className={SectionTitleClass}>2. About Your Business</h3>

//                 <div className="md:col-span-2">
//                   <label className={LabelClass}>Brief description of your business</label>
//                   <textarea name="businessDescription" value={formData.businessDescription} onChange={handleInputChange} rows="3" required className={InputClass} placeholder="e.g., We are a boutique real estate agency..." />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className={LabelClass}>Support Required (Select all that apply)</label>
//                   <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
//                     {SUPPORT_REQUIRED_OPTIONS.map((s) => (
//                       <label key={s} className="flex items-center space-x-2 text-sm text-gray-700">
//                         <input type="checkbox" value={s} checked={formData.supportRequired.includes(s)} onChange={handleCheckboxChange} className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300" />
//                         <span>{s}</span>
//                       </label>
//                     ))}
//                     <div className="col-span-2 sm:col-span-1">
//                       <label className="flex items-center space-x-2 text-sm text-gray-700">
//                         <input type="checkbox" value="Other" checked={!!formData.supportRequiredOther} onChange={(e) => { if (!e.target.checked) setFormData(p => ({ ...p, supportRequiredOther: "" })); }} className="rounded text-yellow-500 focus:ring-yellow-400 border-gray-300" />
//                         <span>Other</span>
//                       </label>
//                       {(!!formData.supportRequiredOther || formData.supportRequired.length === 0) && (
//                         <input type="text" name="supportRequiredOther" value={formData.supportRequiredOther} onChange={handleInputChange} className="mt-1 w-full rounded-lg border px-2 py-1 text-sm" placeholder="Specify other admin task..." />
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <h3 className={SectionTitleClass}>3. Workload & Availability</h3>

//                 <div>
//                   <label className={LabelClass}>Expected Start Date</label>
//                   <select name="expectedStartDate" value={formData.expectedStartDate} onChange={handleInputChange} required className={InputClass}>
//                     <option value="">Select date range</option>
//                     {START_DATE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={LabelClass}>Hours Required</label>
//                   <select name="employmentType" value={formData.employmentType} onChange={handleInputChange} required className={InputClass}>
//                     <option value="">Select type</option>
//                     {EMPLOYMENT_TYPE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                   </select>
//                 </div>

//                 {formData.employmentType === "Part-time" && (
//                   <div>
//                     <label className={LabelClass}>Preferred Part-time Shift</label>
//                     <select name="preferredShift" value={formData.preferredShift} onChange={handleInputChange} className={InputClass}>
//                       <option value="">Select shift</option>
//                       {PART_TIME_SHIFT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                     </select>
//                   </div>
//                 )}

//                 <div>
//                   <label className={LabelClass}>Preferred Time Overlap</label>
//                   <select name="preferredTimeOverlap" value={formData.preferredTimeOverlap} onChange={handleInputChange} required className={InputClass}>
//                     <option value="">Select overlap</option>
//                     {TIME_OVERLAP_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={LabelClass}>Budget / Price Range (Est.)</label>
//                   <select name="budgetRange" value={formData.budgetRange} onChange={handleInputChange} required className={InputClass}>
//                     <option value="">Select budget</option>
//                     <option>$1,000 - $5,000</option>
//                     <option>$5,000 - $10,000</option>
//                     <option>$10,000 - $25,000</option>
//                     <option>$25,000+</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className={LabelClass}>Gender Preference</label>
//                   <select name="genderPreference" value={formData.genderPreference} onChange={handleInputChange} className={InputClass}>
//                     <option value="">Select preference</option>
//                     <option>Male</option>
//                     <option>Female</option>
//                     <option>Not specific</option>
//                   </select>
//                 </div>

//                 <h3 className={SectionTitleClass}>4. Required Skills & Experience</h3>

//                 <div className="md:col-span-2">
//                   <label className={LabelClass}>Specific Skill Sets Required</label>
//                   <textarea name="specificSkillSets" value={formData.specificSkillSets} onChange={handleInputChange} rows="2" className={InputClass} placeholder="e.g., Advanced Excel, HubSpot administration..." />
//                 </div>

//                 <div>
//                   <label className={LabelClass}>Industry Experience Required?</label>
//                   <select name="industryExperienceRequired" value={formData.industryExperienceRequired} onChange={handleInputChange} className={InputClass}>
//                     <option value="">Select option</option>
//                     {YES_NO_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                   </select>
//                 </div>

//                 {formData.industryExperienceRequired === "Yes" && (
//                   <div>
//                     <label className={LabelClass}>Specify Required Experience</label>
//                     <input type="text" name="industryExperienceDetails" value={formData.industryExperienceDetails} onChange={handleInputChange} className={InputClass} placeholder="e.g., 2+ years in recruitment admin" />
//                   </div>
//                 )}

//                 <h3 className={SectionTitleClass}>5. Key Tools, Software & Systems</h3>

//                 <div className="md:col-span-2">
//                   <label className={LabelClass}>List key software and systems (CRM, Accounting, PM)</label>
//                   <textarea name="keyToolsAndSoftware" value={formData.keyToolsAndSoftware} onChange={handleInputChange} rows="3" className={InputClass} placeholder="e.g., Salesforce, Trello, Xero, Slack, Zoom" />
//                 </div>

//                 <div className="md:col-span-2 mt-8">
//                   <label className={LabelClass}>Additional Notes / Message</label>
//                   <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" className={InputClass} placeholder="Any other information that is important for us to know." />
//                 </div>

//                 <div className="md:col-span-2 mt-8">
//                   <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-yellow-400 py-4 text-black font-bold text-lg hover:bg-yellow-500 transition shadow-md disabled:bg-gray-400">
//                     {isSubmitting ? "Submitting..." : "Submit Questionnaire"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default LandingPage;
import React, { useState } from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const SERVICES = [
  "Administrative Support",
  "Customer Service",
  "Social Media Management",
  "Email & Calendar Management",
  "Executive Assistance",
  "Bookkeeping Support",
];

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

const START_DATE_OPTIONS = ["ASAP", "Within 1 week", "Within 2–4 weeks", "Flexible"];
const EMPLOYMENT_TYPE_OPTIONS = ["Full-time", "Part-time", "Casual / Project-based"];
const PART_TIME_SHIFT_OPTIONS = [
  "Morning shift (9.30am to 1.30pm)",
  "Afternoon shift (1.30pm to 5.30pm)",
  "Flexible",
];
const TIME_OVERLAP_OPTIONS = ["9am–12pm", "9am–3pm", "Full-day", "Flexible"];
const YES_NO_OPTIONS = ["Yes", "No"];

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessWebsite: "",
  industrySector: "",
  industrySectorOther: "",
  businessDescription: "",
  supportRequired: [],
  supportRequiredOther: "",
  
  // Task selections
  generalAdminTasks: [],
  socialMediaManagementTasks: [],
  bookkeepingTasks: [],
  marketingContentTasks: [],
  websiteSEOTasks: [],
  emailMarketingTasks: [],
  
  // NEW FIELD ADDED HERE for Change 1
  otherTaskRequirements: "", 
  
  // Software by category
  keyToolsAndSoftwareOffice: [],
  keyToolsAndSoftwareOtherOffice: "",
  keyToolsAndSoftwareCRM: [],
  keyToolsAndSoftwareOtherCRM: "",
  keyToolsAndSoftwareAccounting: [],
  keyToolsAndSoftwareOtherAccounting: "",
  keyToolsAndSoftwareMarketing: [],
  keyToolsAndSoftwareOtherMarketing: "",
  
  expectedStartDate: "",
  employmentType: "",
  preferredShift: "",
  preferredTimeOverlap: "",
  specificSkillSets: "",
  industryExperienceRequired: "",
  industryExperienceDetails: "",
  
  // Training & Compliance
  trainingProvided: "",
  ndaRequired: "",
  complianceRequirements: "",
  
  // Discovery Call
  discoveryCallRequired: "",
  preferredCallTime: "",
  
  message: "",
  budgetRange: "",
  genderPreference: "",
};

const InputClass = "mt-2 w-full rounded-lg border-2 border-gray-400 px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white";
const LabelClass = "text-sm font-bold text-black";
const SectionTitleClass = "md:col-span-2 text-xl font-extrabold text-black/80 mt-6 border-t pt-6";

const API_BASE_URL = 'http://localhost:4000';

const LandingPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "industrySector" && value !== "Other") next.industrySectorOther = "";
      if (name === "industryExperienceRequired" && value !== "Yes") next.industryExperienceDetails = "";
      if (name === "employmentType" && value !== "Part-time") next.preferredShift = "";
      return next;
    });
  };

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

  // This old function is unused/deprecated and can be ignored
  const handleSoftwareCheckboxChange = (e) => {
    // ... logic for old keyToolsAndSoftware array removed
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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

      console.log(" Submitting lead to server:", leadToSave);

      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadToSave),
      });

      console.log(" Server response status:", response.status);
      
      const result = await response.json();
      console.log(" Server response data:", result);

      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.status}`);
      }

      if (result.success) {
        setSubmitMessage("Thank you! Your request has been submitted successfully. We'll contact you within 24 to 48 hours.");
        setFormData(initialFormState);
        
        // Notify other tabs to refresh
        try {
          localStorage.setItem('jaga:leads-updated', String(Date.now()));
        } catch (e) {
          console.warn('Could not write to localStorage:', e);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error(" Form submission error:", error);
      setSubmitMessage(` Error: ${error.message}. Please try again or contact support.`);
    } finally {
      setIsSubmitting(false);
      // Clear message after 8 seconds
      //setTimeout(() => setSubmitMessage(""), 8000);
    }
  };

  return (
    <>
      <Header />
      <script src="https://app.wotnot.io/chat-widget/3HtdW3W8ZPzR081224776188TpLFmPvH.js" defer></script>
      <main className="bg-white text-black">
        {submitMessage && (
          <div className="sticky top-0 z-50">
            <div
              className="p-4 text-center font-semibold"
              style={{
                backgroundColor: submitMessage.includes("Thank you") ? "#dcfce7" : "#fee2e2",
                color: submitMessage.includes("Thank you") ? "#166534" : "#991b1b",
              }}
            >
              {submitMessage}
            </div>
          </div>
        )}

        <section className="relative overflow-hidden bg-yellow-400" style={{ backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="max-w-6xl mx-auto px-6 py-32 text-black">
            <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-3xl">
              Expert Virtual Assistant Services for Your Business
            </h1>
            <p className="text-xl md:text-2xl text-black/80 mt-6 max-w-2xl leading-relaxed">
              Streamline your operations with dedicated professionals. Focus on what matters while we handle the rest.
            </p>
            <div className="flex flex-wrap gap-4 mt-12">
              <button
                onClick={() => {
                  const formSection = document.getElementById("contact-form");
                  if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 rounded-lg bg-black text-white font-bold text-lg hover:bg-gray-900 transition shadow-lg"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-24 px-6" id="contact-form">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center text-black">Get Started Today</h2>
            <p className="text-gray-700 text-center mt-4 text-lg">Please fill out the details below so we can match you with the perfect professional.</p>

            <div className="bg-white rounded-lg border-2 border-black shadow-lg p-10 mt-12">
              <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
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





                <div className="md:col-span-2 mt-8">
                  <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-yellow-400 py-4 text-black font-bold text-lg hover:bg-yellow-500 transition shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
             
            </div>
          </div>
        </section>
         <section className="max-w-6xl mx-auto px-6 py-20" id="services">
           <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-black mt-3 text-black">Our Virtual Assistant Services</h2>
             <p className="text-gray-700 mt-3 text-lg">Comprehensive support solutions tailored to your business needs</p>
           </div>
          <div className="grid gap-6 md:grid-cols-3 mt-14">
             {SERVICES.map((s) => (
               <div key={s} className="rounded-lg border-2 border-black bg-white p-8 shadow-md hover:shadow-lg transition">
                 <div className="w-14 h-14 rounded-full bg-yellow-400 text-black flex items-center justify-center mb-5 font-bold text-2xl">🏢</div>
                 <h3 className="text-lg font-bold text-black">{s}</h3>
                 <p className="text-gray-700 mt-3">Professional {s.toLowerCase()}</p>
               </div>
             ))}
           </div>
         </section>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;