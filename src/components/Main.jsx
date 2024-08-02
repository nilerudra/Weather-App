import { useNavigate } from "react-router-dom";
import cloud_icon from "../assets/cloudy.png";
import { useState, useEffect } from "react";

export default function Main() {
  const Navigate = useNavigate();
  const main_img =
    "https://assets.api.uizard.io/api/cdn/stream/d0bb0968-406e-4014-b9ab-080788e9d44b.png";

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    display: "flex",
    height: "100vh",
    padding: "40px",
    backgroundColor: "#0b131e",
    flexDirection: isMobile ? "column" : "row",
  };

  const leftStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "8px",
    background: "#202b3b",
    backdropFilter: "blur(10px)",
    height: isMobile ? "50%" : "auto",
  };

  const rightStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0b131e",
    padding: "20px",
    height: isMobile ? "50%" : "auto",
  };

  const imgStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  };

  const h1Style = {
    color: "#fff",
    margin: "20px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    fontWeight: "500",
    borderRadius: "50px",
    cursor: "pointer",
  };

  const iconStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
  };

  const iconDiv = {
    maxWidth: "50px",
    maxHeight: "50px",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        <img src={main_img} alt="Main" style={imgStyle} />
      </div>
      <div style={rightStyle}>
        <div style={iconDiv}>
          <img style={iconStyle} src={cloud_icon} alt="" />
        </div>
        <h3 style={h1Style}>Weather App</h3>
        <button
          style={buttonStyle}
          onClick={() => {
            Navigate("/home");
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
