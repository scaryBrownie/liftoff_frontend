"use client";
// CoinFlip.js
import { useEffect, useState } from "react";

const CoinFlip = ({ isFlipping, result }) => {
   const [flipClass, setFlipClass] = useState("");

   useEffect(() => {
      if (isFlipping) {
         // Briefly reset the flipClass to retrigger animation
         setFlipClass("");

         // Set the new flip class after a short delay
         setTimeout(() => {
            setFlipClass(result === "heads" ? "heads" : "tails");
         }, 50); // Adjust delay as needed to allow reset
      }
   }, [isFlipping, result]);

   return (
      <div className={`coin ${flipClass}`}>
         <div className="sideA"></div>
         <div className="sideB"></div>
      </div>
   );
};

export default CoinFlip;
