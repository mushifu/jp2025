import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ThemeSelector from "../components/ThemeSelector";

export default function SettingsPage() {
  return (
    <BackgroundWrapper>
      <div className="max-w-md w-full">
        <ThemeSelector />
      </div>
    </BackgroundWrapper>
  );
}
