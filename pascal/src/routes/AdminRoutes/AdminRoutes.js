import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { adminRootName } from "../../constant";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import ProjectRequest from "../../Pages/AdminPages/PrivatePages/ProjectRequest";
import Setting from "../../Pages/AdminPages/PrivatePages/Setting";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toGetOwnerAddressAction } from "../../redux/action/admin.action";
import * as Session from "../../utils/session";
import { disconnectAddress } from "../../redux/action/connect.action";
const AdminRoutes = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const metamaskAddress = useSelector((state) =>
		state.connect.metamaskAddress ? state.connect.metamaskAddress : false
	);

	useEffect(() => {
		checkIfAuth();
	}, []);

	const checkIfAuth = async () => {
		if (metamaskAddress !== false) {
			let walletType = Session.getLoginSession();
			let ownerAddress = await dispatch(toGetOwnerAddressAction(walletType));

			if (ownerAddress.toLowerCase() !== metamaskAddress.toLowerCase()) {
				await dispatch(disconnectAddress());
				Session.removeLoginSession();
				history.push(`${adminRootName}/login`);
			}
		} else {
			await dispatch(disconnectAddress());
			Session.removeLoginSession();
			history.push(`${adminRootName}/login`);
		}
	};
	return (
		<div className="PrivateArea__content">
			<div className="PrivateArea__contentIn">
				<div className="dashLeft">
					<AdminHeader />
					<AdminSidebar />
				</div>
				<div className="dashRight">
					{/* <Route
						path={`${adminRootName}/dashboard`}
						component={Dashboard}
						exact={true}
					/> */}
					<Route
						path={`${adminRootName}/project/requests`}
						component={ProjectRequest}
						exact={true}
					/>
					<Route
						path={`${adminRootName}/settings`}
						component={Setting}
						exact={true}
					/>
					<div className="copyright text-center">
						<p className="text-white">
							©{new Date().getFullYear()} Redmars - All Rights Reserved.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminRoutes;
