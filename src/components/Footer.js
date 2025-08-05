"use client";

import { Heart } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="dashboard-footer bg-gray-900 text-white py-6 text-center">
      <div className="footer-content space-y-2">
        <p>© Office Management System 2025. All Rights Reserved.</p>
        <p>
          Crafted with <Heart size={16} className="inline-block text-red-500 mx-1 heart-icon" />
          in Kashmir by{" "}
          <span className="developer-name font-semibold">Saibbyweb</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
