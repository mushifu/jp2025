import React, { useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ThemeSelector from "../components/ThemeSelector";
import TopBar from '../components/TopBar';

export default function SettingsPage() {
  return (
    <BackgroundWrapper>
      <div className="max-w-md w-full space-y-4">
        <TopBar />
        <ThemeSelector />
      </div>
    </BackgroundWrapper>
  );
}
