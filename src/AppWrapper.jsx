import React, { useEffect } from "react";

const AppWrapper = ({ children }) => {
  // Remove any lingering UI elements that may come from cached builds
  // (for example an "Admin Dashboard" button) to ensure navigation
  // is only via URL as requested.
  useEffect(() => {
    const removeHeaderButtons = () => {
      try {
        // Remove any interactive elements inside header/nav
        const headerButtons = document.querySelectorAll("header button, header a, nav button, nav a");
        headerButtons.forEach((el) => el.remove());

        // Also remove any standalone buttons/links whose visible text is 'Admin Dashboard' or 'Home'
        const candidates = document.querySelectorAll("button, a, div, span");
        candidates.forEach((el) => {
          const text = (el.textContent || "").trim().toLowerCase();
          if (!text) return;
          if (text === "admin dashboard" || text === "home" || text.includes("admin dashboard") || text === "admin") {
            el.remove();
          }
        });
      } catch (e) {
        // ignore DOM errors
      }
    };

    // Run immediately and set up a MutationObserver to catch dynamically added nodes
    removeHeaderButtons();

    const observer = new MutationObserver(() => removeHeaderButtons());
    observer.observe(document.body, { childList: true, subtree: true });

    // Also run a fallback delayed cleanup
    const t = setTimeout(removeHeaderButtons, 800);
    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* Inline global styles — unchanged */}
      <style>{`
        /* Force-hide any navigation buttons/links inside header or nav to
           guarantee URL-only access as requested. This is a safety net
           in case stale or injected UI tries to render navigation buttons. */
        header button, header a, nav button, nav a {
          display: none !important;
          visibility: hidden !important;
        }

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: #f9fafb;
          color: #111827;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        table {
          border-collapse: separate;
          border-spacing: 0;
        }
        th, td {
          white-space: nowrap;
        }
      `}</style>

      {children}
    </>
  );
};

export default AppWrapper;
