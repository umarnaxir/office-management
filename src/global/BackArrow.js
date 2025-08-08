"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackArrow = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/"); 
  };

  return (
    <button
      onClick={handleBack}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "#000",
        textDecoration: "none",
        margin: "20px",
        padding: "12px 20px",
        backgroundColor: "#fff",
        border: "1px solid #333",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "500",
        transition: "all 0.2s ease-in-out",
        minWidth: "160px",
        justifyContent: "center",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#000";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#fff";
        e.currentTarget.style.color = "#000";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(0.98)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1)";
      }}
    >
      <ArrowLeft size={24} />
      <span>Back to Home</span>
    </button>
  );
};

export default BackArrow;