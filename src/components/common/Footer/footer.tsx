import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-sm text-white/90 bg-gray-800  font-sans">
      © {new Date().getFullYear()} Pomwha. All rights reserved.
    </footer>
  );
};
