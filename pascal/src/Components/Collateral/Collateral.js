import React, { Component } from "react";
import "./Collateral.scss";
import Collaterallist from "./Collaterallist";
import Form from "react-bootstrap/Form";

const Collateral = () => {
  return (
    <div className="collateral-page">
      <Form className="searchbar">
        <Form.Group controlId="formBasicEmail">
          <span className="search-icon"> </span>

          <Form.Control type="text" placeholder="Search collateral asset" />
        </Form.Group>
      </Form>
      <ul className=" heading-list">
        <li>Asset</li>
        <li>APY</li>
      </ul>
    </div>
  );
};

export default Collateral;
