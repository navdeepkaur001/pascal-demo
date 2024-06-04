import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
const AdminAuthGuard = ({ component: Component, ...rest }) => {
  const adminAddress = useSelector((state) => state.connect.metamaskAddress);
  const type = useSelector((state) => state.connect.isLogin);
  return (
    <Route
      {...rest}
      render={(props) =>
        adminAddress && type == true? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    token: true,
  };
};

export default connect(mapStateToProps, null)(AdminAuthGuard);
