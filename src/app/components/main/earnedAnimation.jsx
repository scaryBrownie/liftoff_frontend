import React, { useEffect, useState } from "react";

const EarnedPointsAnimation = ({ points }) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      if (points) {
         setIsVisible(true);

         // Hide the animation after 1.5 seconds
         const timer = setTimeout(() => setIsVisible(false), 1500);
         return () => clearTimeout(timer);
      }
   }, [points]);

   return (
      <div className={`earned-points ${isVisible ? "fade-up" : ""}`}>
         +{points} Points
      </div>
   );
};

export default EarnedPointsAnimation;
