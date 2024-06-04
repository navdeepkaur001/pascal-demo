import React, { useState } from "react";
import "./Header.scss";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, animateScroll as scroll } from "react-scroll";
import { BrowserRouter as Router, NavLink, useHistory } from "react-router-dom";
import logo from "../../Assets/images/Logo.png";
import MetaPopup from "../MetaPopup/MetaPopup";
import { useSelector } from "react-redux";
import CommonModal from "../CommonModal/CommonModal";

const Header = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const walletAddress = useSelector((state) =>
    state.connect.metamaskAddress ? state.connect.metamaskAddress : false
  );

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const pathName = window.location.pathname.indexOf("project");
  return (
    <Navbar fixed="top" bg="light" expand="lg" className="topbar">
      <Container fluid className="custom-header">
        <Navbar.Brand>
          <img src={logo} className="logo" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav " className="justify-content-end">
          <Nav className="me-auto">
            {pathName !== 1 ? (
              <>
                <Link
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  to="section1"
                >
                  Home
                </Link>
                <Link
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  to="section2"
                >
                  About
                </Link>
                {walletAddress !== false && (
                  <NavLink
                    className="nav-link"
                    activeClass="active"
                    to="/project"
                  >
                    Project
                  </NavLink>
                )}
                <Link
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  to="section5"
                >
                  Tokenomics
                </Link>
                <Link
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  to="section6"
                >
                  Roadmap
                </Link>
                {/* <Link
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  to="section7"
                >
                  Presale
                </Link> */}
                <Link
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  to="section8"
                >
                  Contact
                </Link>{" "}
              </>
            ) : (
              <>
                <Link
                  className="nav-link"
                  activeClass="active"
                  onClick={() => history.push("/")}
                  to=""
                >
                  Home
                </Link>
                <Link
                  className="nav-link"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={handleShow}
                >
                  Transactions
                </Link>
                <CommonModal
                  show={show}
                  onHide={handleClose}
                  title={"Transaction History"}
                />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <MetaPopup />
      </Container>
    </Navbar>
  );
};

export default Header;
