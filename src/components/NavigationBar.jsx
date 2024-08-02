import { useState } from "react";

export default function NavigationBar() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const logo =
    "https://assets.api.uizard.io/api/cdn/stream/d0bb0968-406e-4014-b9ab-080788e9d44b.png";

  const sidebarStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "65px",
    height: "94vh",
    borderRadius: "10px",
    background: "#202b3b",
    backdropFilter: "blur(10px)",
    padding: "20px",
    boxSizing: "border-box",
    color: "#fff",
    fontSize: "14px",
  };

  const logoStyle = {
    width: "50px",
    height: "auto",
    marginBottom: "20px",
  };

  const menuStyle = {
    display: "flex",
    flexDirection: "column",
    listStyleType: "none",
    padding: "0",
    margin: "0",
    width: "100%",
    textAlign: "center",
  };

  const menuItemStyle = (isHovered) => ({
    fontSize: "12px",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    color: isHovered ? "#fff" : "#9399a2",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  });

  const iconStyle = (isHovered) => ({
    color: isHovered ? "#fff" : "#9399a2",
    fontSize: "20px",
    marginBottom: "10px",
  });

  return (
    <div style={sidebarStyle}>
      <img src={logo} alt="weather app" style={logoStyle} />
      <ul style={menuStyle}>
        <li
          style={menuItemStyle(hoveredItem === "Weather")}
          onMouseEnter={() => setHoveredItem("Weather")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <i
            className="fas fa-cloud-sun"
            style={iconStyle(hoveredItem === "Weather")}
          ></i>
          Weather
        </li>
        <li
          style={menuItemStyle(hoveredItem === "Cities")}
          onMouseEnter={() => setHoveredItem("Cities")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <i
            className="fas fa-city"
            style={iconStyle(hoveredItem === "Cities")}
          ></i>
          Cities
        </li>
        <li
          style={menuItemStyle(hoveredItem === "Map")}
          onMouseEnter={() => setHoveredItem("Map")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <i
            className="fas fa-map"
            style={iconStyle(hoveredItem === "Map")}
          ></i>
          Map
        </li>
      </ul>
    </div>
  );
}
