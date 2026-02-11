import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppProvider } from "@/context/AppContext";
import "./index.css";

console.log("DEBUG: main.jsx mounting App");

const container = document.getElementById("root");
if (!container) {
  console.error("No #root element found in DOM");
} else {
  const root = createRoot(container);
  root.render(
      <AppProvider>
        <App />
      </AppProvider>
  );
}

// Load WotNot widget only on the deployed Vercel hostname(s)
(function(){
  try {
    var allowedHosts = ['jagatest.vercel.app','www.jagatest.vercel.app'];
    console.log('WotNot loader (entry):', location.hostname);
    if (allowedHosts.indexOf(location.hostname) === -1) {
      console.log('WotNot loader: host not allowed, skipping');
      return;
    }

    function loadWidget(){
      console.log('WotNot loader: injecting widget script and iframe');
      var s = document.createElement('script');
      s.src = 'https://app.wotnot.io/chat-widget/3HtdW3W8ZPzR081224776188TpLFmPvH.js';
      s.defer = true;
      s.onload = function(){ console.log('WotNot loader: script loaded'); };
      s.onerror = function(){ console.error('WotNot loader: script failed to load'); };
      document.head.appendChild(s);

      var iframe = document.createElement('iframe');
      iframe.width = '360';
      iframe.height = '600';
      iframe.src = 'https://embed.wotnot.io/3HtdW3W8ZPzR081224776188TpLFmPvH/bot/5ucJpctwuvx20812256017849Jr1k3xS?display_header=false&history_retention=false';
      iframe.frameBorder = '0';
      iframe.style.border = '0';
      iframe.style.position = 'fixed';
      iframe.style.right = '20px';
      iframe.style.bottom = '20px';
      iframe.style.zIndex = '2147483647';
      document.body.appendChild(iframe);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadWidget);
    } else {
      loadWidget();
    }
  } catch (e) {
    console.error('WotNot loader error', e);
  }
})();