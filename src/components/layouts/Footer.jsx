import React from "react";
import { Mail, PhoneCall, MapPin } from "lucide-react";
import jagalogo from '@/assets/jaga logo.png';

const Footer = () => (
  <footer className="bg-black text-white mt-20 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex-shrink-0">
                    <img 
                      src={jagalogo} 
                      alt="JAGA Logo" 
                      className="h-10 w-auto"
                    />
                  </div>
        <p className="text-sm text-gray-300">
          Professional virtual assistant services to help your business thrive.
        </p>
      </div>

      <div>
        <h4 className="text-lg font-bold text-white mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {["Services", "Contact", "About Us", "Careers"].map((link) => (
            <li
              key={link}
              className="text-gray-300 hover:text-yellow-400 transition cursor-pointer"
            >
              {link}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold text-white mb-3">
          Contact Info
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-yellow-400" />
            contact@vaportal.com
          </li>
          <li className="flex items-center">
            <PhoneCall className="w-4 h-4 mr-2 text-yellow-400" />
            +1 (555) 123-4567
          </li>
          <li className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
            123 Business Ave, Suite 100
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-gray-700 mt-8 pt-4">
      <p className="text-xs text-gray-400">
        &copy; {new Date().getFullYear()} JAGA Virtual Assistant Services. All rights
        reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
