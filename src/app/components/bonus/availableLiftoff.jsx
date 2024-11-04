import { formatFloat } from "@/app/tools/fixBalanceNumber";
import React from "react";

const AvailableLiftoff = ({ liftoff }) => {
   return (
      <div className="w-full h-auto py-[10px] flex flex-col border-2 border-yellow items-center rounded-lg">
         <h5 className="text-yellow">AVAILABLE $LIFTOFF</h5>
         <h5 className="text-[38px] text-yellow">{formatFloat(liftoff)}</h5>
      </div>
   );
};

export default AvailableLiftoff;
