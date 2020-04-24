import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="text-right pr-5 header">
      <Link to="/login">login</Link>
    </div>
  )
}

export default Header;
