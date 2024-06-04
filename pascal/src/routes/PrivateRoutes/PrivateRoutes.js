import React, { useState } from "react";
import { withRouter } from "react-router";
import Dashboard from "../../Pages/PrivatePages/Dashboard/Dashboard";
import { Route } from "react-router-dom";
import { rootName } from "../../constant";

const PrivateRoutes = () => {
  const [expanded, setExpanded] = useState(false);

  const handleSidebar = (expanded) => {
    setExpanded(!expanded);
  };

  const closeSidebar = () => {
    setExpanded(false);
  };

  return (
    <div className="PrivateArea__content">
      <div className="dark-theme">
        <div className="top-header">
          <button
            className="onclick-btn"
            onClick={() => handleSidebar()}
          ></button>
        </div>

        <div className="ui container-fluid inner-container bg-black">
          <div className="maincenter">
            <Route
              path={`${rootName}/auth/dashboard`}
              component={Dashboard}
              exact={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRoutes;
