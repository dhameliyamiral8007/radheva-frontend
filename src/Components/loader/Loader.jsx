import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
      <div className="w-10 h-10 border-4 border-[#B5904F] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;


