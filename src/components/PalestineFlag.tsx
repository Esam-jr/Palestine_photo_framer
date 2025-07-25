import React from 'react';

interface PalestineFlagProps {
  className?: string;
}

const PalestineFlag: React.FC<PalestineFlagProps> = ({ className = "w-12 h-8" }) => {
  return (
    <div className={`${className} relative overflow-hidden rounded border border-gray-600 shadow-lg`}>
      {/* Black stripe */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-black"></div>
      
      {/* White stripe */}
      <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white"></div>
      
      {/* Green stripe */}
      <div className="absolute top-2/3 left-0 w-full h-1/3 bg-green-600"></div>
      
      {/* Red triangle */}
      <div 
        className="absolute top-0 left-0 w-0 h-0 border-solid"
        style={{
          borderTop: `${className.includes('h-8') ? '16px' : '12px'} solid transparent`,
          borderBottom: `${className.includes('h-8') ? '16px' : '12px'} solid transparent`,
          borderLeft: `${className.includes('w-12') ? '20px' : '16px'} solid #DC2626`
        }}
      ></div>
    </div>
  );
};

export default PalestineFlag;