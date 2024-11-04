import { formatFloat } from "@/app/tools/fixBalanceNumber";
import React from "react";

const BalanceDisplayMain = ({ balance }) => {
   return (
      <div className="w-auto h-auto rounded-lg border-2 border-yellow flex items-center justify-center">
         <h5 className="text-[32px] text-yellow px-6 py-1">
            {formatFloat(balance)}
         </h5>
      </div>
   );
};

export default BalanceDisplayMain;
