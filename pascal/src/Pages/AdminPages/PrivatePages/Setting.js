import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { CommonService } from "../../../utils/commonService";
import { useDispatch, useSelector } from "react-redux";
import {
  redmarsTokenDetailsAction,
  redmarsTokenAction,
} from "../../../redux/action/user.action";
import { getLoginSession } from "../../../utils/session";
import {
  toUpdateRedmarsMinAmountAction,
  toUpdateRedmarsAddressAction,
  toUpdateAdminSharePercentageAction,
  toUpdateAdminAddressAction,
  toGetAdminAddressAction,
  toGetAdminSharePercentageAction,
} from "../../../redux/action/admin.action";
import { toast } from "../../../Components/Toast/Toast";
import "./Privatestyle.scss";

const Setting = () => {
  const dispatch = useDispatch();
  const walletType = getLoginSession();
  const userAddress = useSelector((state) =>
    state.connect.metamaskAddress ? state.connect.metamaskAddress : false
  );
  const [minRedmars, setMinRedmars] = useState(0);
  const [redmarsAddress, setRedmarsAddress] = useState("");
  const [redMarsTokenDecimals, setredMarsTokenDecimals] = useState("");
  const [currentRedmarsOwner, setRedmarsOwner] = useState("");
  const [redmarsAdminAddress, setredmarsAdminAddress] = useState("");
  const [redmarsAdminSharePercentage, setredmarsAdminSharePercentage] =
    useState("");

  useEffect(() => {
    OnInit();
  }, []);

  //Onit function
  const OnInit = async () => {
    //admin share parencentage & address
    getAdminShareDetails();

    let getRedmarsTokenDetails = await dispatch(
      redmarsTokenDetailsAction(walletType)
    );
    if (getRedmarsTokenDetails && getRedmarsTokenDetails !== undefined) {
      //set Redmars Address
      setRedmarsAddress(getRedmarsTokenDetails?.redMarsTokenAddress);
      setRedmarsOwner(getRedmarsTokenDetails?.redMarsTokenAddress);
      //remars token balance details
      let getRedmarsTokenBalance = await dispatch(
        redmarsTokenAction(walletType, {
          walletAddress: userAddress,
          tokenAddress: getRedmarsTokenDetails.redMarsTokenAddress,
        })
      );
      if (
        getRedmarsTokenBalance &&
        getRedmarsTokenBalance.hasOwnProperty("redmarsTokenDecimal")
      ) {
        let tokenDecimals = getRedmarsTokenBalance.redmarsTokenDecimal;
        setredMarsTokenDecimals(tokenDecimals);
        let minRedMars =
          getRedmarsTokenDetails.redmarsMinAmount / tokenDecimals;
        setMinRedmars(minRedMars);
      }
    }
  };

  // function to get admin share percentage & admin address
  const getAdminShareDetails = async () => {
    let getAdminShare = await dispatch(toGetAdminSharePercentageAction());
    if (getAdminShare) {
      setredmarsAdminSharePercentage(getAdminShare / 100);
    }
    let adminAddress = await dispatch(toGetAdminAddressAction());
    if (adminAddress) {
      setredmarsAdminAddress(adminAddress);
    }
  };

  //Function to update minimum redmars
  const updateMinRedmarsHandler = async (e) => {
    e.preventDefault();
    let minAmount = CommonService.convertWithDecimal(
      minRedmars,
      redMarsTokenDecimals
    );
    let data = { walletAddress: userAddress, minAmount: minAmount };
    let setRedMarsMinAmount = await dispatch(
      toUpdateRedmarsMinAmountAction(walletType, data)
    );
    if (setRedMarsMinAmount && setRedMarsMinAmount?.status === true) {
      toast.success("Minimum redmars amount updated successfully");
      OnInit();
    }
  };
  //Function to update redmars address
  const updateRedmarsAddressHandler = async (e) => {
    e.preventDefault();
    let data = { redmarsAddress: redmarsAddress, walletAddress: userAddress };
    if (currentRedmarsOwner !== redmarsAddress) {
      let updateRedmarsAddress = await dispatch(
        toUpdateRedmarsAddressAction(walletType, data)
      );

      if (updateRedmarsAddress && updateRedmarsAddress?.status === true) {
        toast.success("Redmars address updated successfully");
        OnInit();
      }
    } else {
      toast.error("Redmars address need to be different for update");
    }
  };

  //Function to update admin share precentage
  const updateAdminSharePercentageHandler = async (e) => {
    e.preventDefault();
    let updatedPercentage = redmarsAdminSharePercentage * 100;
    let data = {
      adminSharePercentage: updatedPercentage,
      walletAddress: userAddress,
    };
    let updateSharePercentage = await dispatch(
      toUpdateAdminSharePercentageAction(walletType, data)
    );

    if (updateSharePercentage && updateSharePercentage?.status === true) {
      toast.success("Share percentage updated successfully");
      OnInit();
    }
  };

  //Function to update admin address
  const updateRedmarsAdminAddressHandler = async (e) => {
    e.preventDefault();
    let data = {
      adminAddress: redmarsAdminAddress,
      walletAddress: userAddress,
    };
    let updateAdminAddress = await dispatch(
      toUpdateAdminAddressAction(walletType, data)
    );
    if (updateAdminAddress && updateAdminAddress?.status === true) {
      toast.success("Admin address updated successfully");
      OnInit();
    }
  };
  return (
    <Container fluid>
      <div className="setting-wrapper">
        <Row className="settings-info">
          <Col md={6}>
            <div className="dashbordInfo">
              {/* <h4>Update Minimum Redmars</h4> */}
              <form className="form_area">
                <Form.Group controlId="form_group">
                  <Form.Label className="required">
                    Update Minimum Redmars
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="minRedmars"
                    value={minRedmars}
                    onChange={(e) => {
                      let result = CommonService.allowOnlyNumber(
                        e.target.value
                      );
                      if (result == true) {
                        setMinRedmars(e.target.value);
                      }
                    }}
                    placeholder="Enter Minimum Redmars"
                  />
                  {/* <p className="imp">
                                            *Only smart contract addresses are supported.
                                        </p> */}
                </Form.Group>
                <Form.Group className="buttomBtn">
                  <Button
                    className="cus-btn"
                    title="Submit"
                    onClick={(e) => {
                      updateMinRedmarsHandler(e);
                    }}
                  >
                    Update
                  </Button>
                </Form.Group>
              </form>
            </div>
          </Col>
          <Col md={6}>
            <div className="dashbordInfo">
              {/* <h4>Update Redmars</h4> */}
              <form className="form_area">
                <Form.Group controlId="form_group">
                  <Form.Label className="required">
                    Update Redmars Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="updateRedmars"
                    value={redmarsAddress}
                    onChange={(e) => {
                      // let result = CommonService.allowOnlyNumber(
                      // 	e.target.value
                      // );
                      // if (result == true) {
                      setRedmarsAddress(e.target.value);
                      //}
                    }}
                    placeholder="Enter Redmars"
                  />
                  {/* <p className="imp">
                                            *Only smart contract addresses are supported.
                                        </p> */}
                </Form.Group>
                <Form.Group className="buttomBtn">
                  <Button
                    className="cus-btn"
                    title="Submit"
                    onClick={(e) => {
                      updateRedmarsAddressHandler(e);
                    }}
                  >
                    Update
                  </Button>
                </Form.Group>
              </form>
            </div>
          </Col>

          <Col md={6}>
            <div className="dashbordInfo">
              {/* <h4>Update Minimum Redmars</h4> */}
              <form className="form_area">
                <Form.Group controlId="form_group">
                  <Form.Label className="required">
                    Update Admin Receiving Percentage
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="minRedmars"
                    value={redmarsAdminSharePercentage}
                    onChange={(e) => {
                      let result = CommonService.allowOnlyNumber(
                        e.target.value
                      );
                      if (result == true) {
                        setredmarsAdminSharePercentage(e.target.value);
                      }
                    }}
                    placeholder="Enter admin receiving address"
                  />
                </Form.Group>
                <Form.Group className="buttomBtn">
                  <Button
                    className="cus-btn"
                    title="Submit"
                    onClick={(e) => {
                      updateAdminSharePercentageHandler(e);
                    }}
                  >
                    Update
                  </Button>
                </Form.Group>
              </form>
            </div>
          </Col>
          <Col md={6}>
            <div className="dashbordInfo">
              {/* <h4>Update Redmars</h4> */}
              <form className="form_area">
                <Form.Group controlId="form_group">
                  <Form.Label className="required">
                    Update Admin Receiving Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="updateRedmars"
                    value={redmarsAdminAddress}
                    onChange={(e) => {
                      setredmarsAdminAddress(e.target.value);
                    }}
                    placeholder="Enter admin receiving address"
                  />
                </Form.Group>
                <Form.Group className="buttomBtn">
                  <Button
                    className="cus-btn"
                    title="Submit"
                    onClick={(e) => {
                      updateRedmarsAdminAddressHandler(e);
                    }}
                  >
                    Update
                  </Button>
                </Form.Group>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Setting;
