import React from "react";
import { Link } from "react-router-dom";

import "./MainHeader.css";

const MainHeader = () => {
  return (
    <header className="main-header">
      <Link to="/">Awesome Thoughts</Link>
    </header>
  );
};

export default MainHeader;
