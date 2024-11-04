import { formatFloat } from "@/app/tools/fixBalanceNumber";
import React from "react";

const ShopBalance = ({ balance }) => {
   return (
      <div className="px-4 py-[2px] bg-transparent border-2 border-yellow rounded-lg">
         <h5 className="text-yellow text-[22px]">{formatFloat(balance)}</h5>
      </div>
   );
};

export default ShopBalance;
