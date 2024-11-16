"use client";
// CoinFlip.js
import { useEffect, useState } from "react";

const CoinFlip = ({ isFlipping, result, coinImgUrl }) => {
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

  // Inline styles for sideA and sideB

  const [sideAStyle, setSideAStyle] = useState({
    backgroundImage: `url(${coinImgUrl})`,

    zIndex: 100,
  });

  //   const sideBStyle = {
  //     backgroundImage: "url('./assets/coin/tail.png')", // Replace with actual path
  //     transform: "rotateY(-180deg)",
  //   };

  return (
    <div className={`coin ${flipClass}`}>
      <div className="sideA" style={sideAStyle}></div>
      <div className="sideB"></div>
    </div>
  );
};

export default CoinFlip;
