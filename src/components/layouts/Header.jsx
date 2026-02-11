// import React from "react";

// const Header = () => {
//   return (
//     <header className="sticky top-0 z-40 bg-white border-b-2 border-black shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0">
//             <h1 className="text-3xl font-extrabold text-black tracking-wide">
//               JAGA
//             </h1>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import jagalogo from '@/assets/jaga logo.png';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <img 
              src={jagalogo} 
              alt="JAGA Logo" 
              className="h-10 w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;