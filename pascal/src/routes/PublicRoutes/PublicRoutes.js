import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import Home from "../../Pages/PublicPages/Home/Home";
import { rootName } from "../../constant";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Project from "../../Pages/PublicPages/Project/Project";

const PublicRoutes = () => {
  return (
    <div className="PublicArea__content">
      <Route path={`${rootName}/`} component={Home} exact={true} />
      <Route path={`${rootName}/project`} component={Project} exact={true} />
    </div>
  );
};
export default PublicRoutes;
//console.log("======testgit ")