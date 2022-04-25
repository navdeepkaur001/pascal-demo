import React from "react";
import "./AdminSidebar.scss";
import { adminRootName, rootName } from "../../constant";
import logo from "../../Assets/images/Logo.png";
import { Link } from "react-router-dom";

const AdminSidebar = (props) => {
	return (
		<div className="sidebar">
			<Link
				to={`${rootName}/dashboard`}
				className="d-flex justify-content-center logo_sidebar"
			>
				<img src={logo} alt="" />
			</Link>
			<ul className="linkList">
				{/* <li>
					<Link to={`${adminRootName}/dashboard`} className="">
						Dashboard
					</Link>
				</li> */}
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
	);
};

export default AdminSidebar;
