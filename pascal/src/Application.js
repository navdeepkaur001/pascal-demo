import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch ,useLocation} from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes/PublicRoutes";

import AuthGuard from "./routes/Guards/AuthGuard";
import PrivateRoutes from "./routes/PrivateRoutes/PrivateRoutes";
import LoaderComponent from "./Components/LoaderCompoent/LoaderCompoent";
import { adminRootName, rootName } from "./constant";
import Login from "./Pages/AdminPages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import * as Session from "./utils/session";
import { connectWithWallet } from "./redux/action/connect.action";

 const Application = () => {
   const dispatch = useDispatch();
  //  const location = useLocation();

  // React.useEffect(() => {
  //   console.log('Location changed' ,location);
  // }, [location]);
   
   useEffect(() => {
     onInit();
   }, []);
   const metaMaskAddress = useSelector((state) =>
     state.connect.metamaskAddress ? state.connect.metamaskAddress : false
   );

   const onInit = async () => {
     //  let result = await dispatch(getNomicsDetails());
     //  if (result && result.status == 200) {
     //    sessionStorage.setItem("price", result.data.data[0].price);
     //  }

     if (metaMaskAddress != false) {
       let walletType = Session.getLoginSession();
       await dispatch(connectWithWallet(walletType));
     }
   };

   return (
     <React.Fragment>
       <LoaderComponent></LoaderComponent>
       <Router>
         <Switch>
           <Route
             path={`${adminRootName}/login`}
             render={(props) => <Login />}
             exact
           />
           {/* <AdminAuthGuard path={`${adminRootName}`} component={AdminRoutes} />
           <AuthGuard path={`${rootName}/auth`} component={PrivateRoutes} /> */}
           <Route path={`${rootName}/`} component={PublicRoutes} />
         </Switch>
       </Router>
     </React.Fragment>
   );
 };

export default Application;
