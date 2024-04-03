import React from "react";
import Logi from "../assets/Logo.png";
function Logo({ width = "200px" }) {
  return <img src={Logi} width={width} alt="logo" />;
}

export default Logo;
