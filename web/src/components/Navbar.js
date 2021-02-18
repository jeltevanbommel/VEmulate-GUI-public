import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import logo from "assets/img/logo-min.png";

const Navbar = (props) => {
  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm">
      <p className="h5 my-0 me-md-auto fw-normal">
        <img src={logo} alt="" height="80" />
      </p>

      <Link to="/">
        <Button outline color="primary" className="px-2 mx-1">
          <i className="fas fa-home"></i> Dashboard
        </Button>
      </Link>
      <Link to="/scenariogen">
        <Button outline color="primary" className="px-2 mx-1">
          <i className="fas fa-hammer"></i>
          Configuration Builder
        </Button>
      </Link>
    </header>
  );
};

export default Navbar;
