"use client";

import { Heart } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "16px",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <div style={{ lineHeight: "1.6" }}>
        <p style={{ margin: 0 }}>
          © Office Management System 2025. All Rights Reserved.
        </p>
        <p style={{ margin: 0 }}>
          Crafted with{" "}
          <Heart
            size={14}
            style={{ display: "inline-block", color: "white", margin: "0 4px" }}
          />
          in Kashmir by{" "}
          <span style={{ fontWeight: "bold" }}>Saibbyweb</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
