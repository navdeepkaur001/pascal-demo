import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
// import Logo from "../../assets/images/logo.png";
import { adminRootName, rootName } from "../../constant";
import "./AdminHeader.scss";
import { disconnectAddress,setLoginStatus } from "../../redux/action/connect.action";
import { toast } from "../Toast/Toast";
import * as Session from "../../utils/session";
import { CommonService } from "../../utils/commonService";
import iconlog from "../../Assets/images/Logo@2x.png";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const userWalletAddress = useSelector(
    (state) => state.connect.metamaskAddress
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [isCollapes, setIsCollapes] = useState(false);
  const handleCollapse = (data) => {
    setIsCollapes(!isCollapes);
  };
  const handleYes = async () => {
    await dispatch(disconnectAddress());
    await dispatch(setLoginStatus(false));
    toast.success("Logout Successfully.");
    history.push(`${adminRootName}/login`);
    Session.removeLoginSession();
  };
  const disconnect = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleYes(),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };
  return (
    <div className="headermain">
      <Navbar
        bg="light"
        expand="lg"
        onToggle={handleCollapse}
        expanded={isCollapes}
      >
        <img src={iconlog} alt="" />
        <Navbar.Brand href="/dashboard">
          {/* <img src={Logo} alt="" /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="top-nav-bar">
            <div className="right_nav">
              <Nav.Item>
                My Wallet :{" "}
                <Nav.Link target="_blank">
                  {CommonService.custmizeAddress(userWalletAddress)}
                </Nav.Link>
              </Nav.Item>
              <ul className="in_reps">
                <li>
                  <Link to={`${adminRootName}/project/requests`} className="">
                    Project Requests
                  </Link>
                </li>
                <li>
                  <Link to={`${adminRootName}/settings`} className="">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </Nav>
        </Navbar.Collapse>
        <NavLink onClick={(e) => disconnect(e)} to="" className="logout">
          LOGOUT
        </NavLink>
      </Navbar>
    </div>
  );
};
export default AdminHeader;
