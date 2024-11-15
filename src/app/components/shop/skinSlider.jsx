"use client";
import React, { useState, useEffect } from "react";
import Skin from "./skin";
import { useAuth } from "@/app/context/UserContext";

const SkinSlider = ({ skins }) => {
  const [selectedSkinId, setSelectedSkinId] = useState(null);
  const { handleSelectSkin, setCoinImgUrl } = useAuth();

  // Initialize `selectedSkinId` based on backend response
  useEffect(() => {
    const initiallySelectedSkin = skins.find((skin) => skin.isSelected);
    if (initiallySelectedSkin) {
      setSelectedSkinId(initiallySelectedSkin.id);
    }
  }, [skins]);

  const skinSelectHandle = async (id) => {
    const res = await handleSelectSkin(id); // Communicate with the backend
    if (res) {
      setSelectedSkinId(id === 0 ? null : id); // Update the state
    }
  };

  const selectSkin = (id, imageUrl) => {
    if (selectedSkinId === id) {
      setCoinImgUrl(imageUrl);
      skinSelectHandle(0); // Deselect the current skin
    } else {
      setCoinImgUrl(imageUrl);
      skinSelectHandle(id); // Select the new skin
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {skins?.map((skin) => (
          <div key={skin.id} className={`${skin.id === 0 && "hidden"}`}>
            <Skin
              skinInfo={skin}
              isSelected={skin.id === selectedSkinId}
              onSelect={() => selectSkin(skin.id, skin.imageUrl)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkinSlider;
