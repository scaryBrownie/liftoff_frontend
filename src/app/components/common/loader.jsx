import React from "react";

const Loader = () => {
   return (
      <div className="absolute z-[1200] bg-black w-screen h-screen overflow-hidden flex items-center justify-center">
         <div className="loader"></div>
      </div>
   );
};

export default Loader;
