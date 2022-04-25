import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useDispatch, useSelector } from "react-redux";
import { getLoginSession } from "../../../utils/session";
import {
  projectCounterAction,
  projectInfoAction,
  tokenDetailsAction,
} from "../../../redux/action/user.action";
import { CommonService } from "../../../utils/commonService";
import {
  toApproveIcoRequestAction,
  toClaimMoneyAction,
} from "../../../redux/action/admin.action";
import { toast } from "../../../Components/Toast/Toast";
import moment from "moment";
import { CURRENCY_NAME } from "../../../constant";
import CopyClipboard from "../../../Components/CopyClipboard/CopyClipboard";
import RequestPopup from "../../../Components/RequestPopup/RequestPopup";
import { TOKENS_TYPE } from "../../../constant";
import { toGetTokensDecimalsAction } from "../../../redux/action/user.action";
import * as Session from "../../../utils/session";
import { toGetAmountRaisedAction } from "../../../redux/action/user.action";

const ProjectRequest = () => {
  const dispatch = useDispatch();
  const walletType = getLoginSession();

  const userAddress = useSelector((state) =>
    state.connect.metamaskAddress ? state.connect.metamaskAddress : false
  );
  const [lovelyInuDecimal, setLovelyInuDecimal] = useState();
  const [shibaInuDecimal, setShibaInuDecimal] = useState();
  const [flokiDecimal, setFlokiDecimal] = useState();
  const [safemoonDecimal, setSafemoonDecimal] = useState();

  const [projectList, setProjectList] = useState([]);
  const [claimedProjects, setClaimedProjects] = useState([]);

  //const [projectCounter, setProjectCounter] = useState(0);
  useEffect(() => {
    OnInit();
    getDecimals();
  }, []);
  const getDecimals = async () => {
    let lovelyInuDecimal = await dispatch(
      toGetTokensDecimalsAction(walletType, TOKENS_TYPE.LOVELYINU)
    );
    lovelyInuDecimal = 10 ** lovelyInuDecimal;

    let shibuDecimal = await dispatch(
      toGetTokensDecimalsAction(walletType, TOKENS_TYPE.SHIBAINU)
    );
    shibuDecimal = 10 ** shibuDecimal;

    let flokiDecimal = await dispatch(
      toGetTokensDecimalsAction(walletType, TOKENS_TYPE.FLOKI)
    );
    flokiDecimal = 10 ** flokiDecimal;

    let safeMoonDecimal = await dispatch(
      toGetTokensDecimalsAction(walletType, TOKENS_TYPE.SAFEMOON)
    );
    safeMoonDecimal = 10 ** safeMoonDecimal;

    setLovelyInuDecimal(lovelyInuDecimal);
    setShibaInuDecimal(shibuDecimal);
    setFlokiDecimal(flokiDecimal);
    setSafemoonDecimal(safeMoonDecimal);
  };
  const OnInit = async () => {
    let temp = [];
    let getCounter = await dispatch(projectCounterAction(walletType));
    if (getCounter) {
      for (let i = 1; i <= getCounter; i++) {
        let records = await dispatch(projectInfoAction(walletType, i));
        if (records) {
          let commonDetails = await dispatch(
            tokenDetailsAction(walletType, records?.tokenAddr)
          );
          //calulate end time//
          let totalTime = Number(records.StartTime) + Number(records.duration);

          records.tokenSymbol = commonDetails.symbol;
          records.tokenDecimal = commonDetails.decimal;
          records.projectId = i;
          records.totalTimeForIco = totalTime;
          if (
            moment(totalTime).isSame(moment()) ||
            moment(moment()).isAfter(totalTime)
          ) {
            records.isSameDayToClaim = true;
          } else {
            records.isSameDayToClaim = false;
          }

          //functionality to get differnt type of token amount raised values
          let data1 = {};
          data1.tokenType = 0;
          data1.projectId = i;
          let res1 = await dispatch(toGetAmountRaisedAction(walletType, data1));
          let data2 = {};
          data2.tokenType = 1;
          data2.projectId = i;
          let res2 = await dispatch(toGetAmountRaisedAction(walletType, data2));
          let data3 = {};
          data3.tokenType = 2;
          data3.projectId = i;
          let res3 = await dispatch(toGetAmountRaisedAction(walletType, data3));
          let data4 = {};
          data4.tokenType = 3;
          data4.projectId = i;
          let res4 = await dispatch(toGetAmountRaisedAction(walletType, data4));
          let data5 = {};
          data5.tokenType = 4;
          data5.projectId = i;
          let res5 = await dispatch(toGetAmountRaisedAction(walletType, data5));

          records.bnbAmountRaised = res1;
          records.lovelyInuAmountRaised = res2;
          records.shibuAmountRaised = res3;
          records.flokiAmountRaised = res4;
          records.safeMoonAmountRaised = res5;

          //end of above functionality

          //check if claimed
          //records.isClaimed = claimedProjects.indexOf(i) == -1 ? false : true;
          // setProjectList((values) => [...values, records]);
          temp.push(records);
        }
      }
      if (temp.length > 0) {
        setProjectList(temp);
      }
    }
  };

  //Approve ICO handler
  const approveIcoHandler = async (e, projectId) => {
    e.preventDefault();
    let data = { walletAddress: userAddress, projectId: projectId };
    let seekApproval = await dispatch(
      toApproveIcoRequestAction(walletType, data)
    );
    if (seekApproval && seekApproval.status == true) {
      toast.success("ICO approved successfully");
      OnInit();
    }
  };

  //claim money handler
  const claimMoneyHandler = async (e, projectId) => {
    e.preventDefault();
    let temp = [];
    let data = { walletAddress: userAddress, projectId: projectId };
    let claim = await dispatch(toClaimMoneyAction(walletType, data));
    if (claim && claim.status == true) {
      temp.push(projectId);
      toast.success("ICO claimed successfully");
      OnInit();
    }
    if (temp.length > 0) {
      setClaimedProjects(projectId);
    }
  };

  const manageIcoStatus = (item) => {
    let status;

    if (item.StartTime == 0 && item.isActive == false) {
      status = <span className="badge bg-danger">In-Active</span>;
    } else {
      if (
        item.amountRaised == 0 &&
        moment(moment()).isAfter(item.totalTimeForIco * 1000) == true
      ) {
        status = <span className="badge bg-danger">ICO Ended</span>;
      }
      if (
        item.amountRaised > 0 &&
        moment(moment()).isAfter(item.totalTimeForIco * 1000) == true
      ) {
        status = <span className="badge bg-danger">ICO Ended</span>;
      }
      if (
        item.isActive == true &&
        item.numberOfTokenForSale == item.numberOfTokenSOLD &&
        moment(item.totalTimeForIco * 1000).isBefore(moment.utc()) == false
      ) {
        status = <span className="badge bg-danger">ICO Ended</span>;
      }
      if (
        item.isActive == true &&
        item.numberOfTokenForSale !== item.numberOfTokenSOLD &&
        moment(item.totalTimeForIco * 1000).isBefore(moment.utc()) == false
      ) {
        status = <span className="badge bg-success">Active</span>;
      }

      if (
        item.isActive == false &&
        item.numberOfTokenForSale == item.numberOfTokenSOLD &&
        item.amountRaised > 0
      ) {
        status = <span className="badge bg-info">Claimed</span>;
      }
    }

    return status;
  };

  const manageButtons = (item) => {
    let button;

    if (
      item.numberOfTokenForSale == item.numberOfTokenSOLD &&
      item.isActive &&
      moment(item.totalTimeForIco * 1000).isBefore(moment.utc()) == false
    ) {
      button = (
        <Button
          type="button"
          className="cus-btn"
          onClick={(e) => {
            claimMoneyHandler(e, item.projectId);
          }}
        >
          Claim
        </Button>
      );
    }

    if (
      moment(item.totalTimeForIco * 1000).isBefore(moment.utc()) == true &&
      item.isActive
    ) {
      button = (
        <Button
          type="button"
          className="cus-btn"
          onClick={(e) => {
            claimMoneyHandler(e, item.projectId);
          }}
        >
          Claim
        </Button>
      );
    }

    return button;
  };

  const renderTooltip = (item) => {
    return (
      <Tooltip id="button-tooltip">
        <div className="amount-raised-info">
          <div className="inneramount-raised-info">
            <div className="left info">Amount raised in bnb</div>
            <div className="right info">
              {item?.bnbAmountRaised > 0 ? item?.bnbAmountRaised / 10 ** 18 : 0}
            </div>
          </div>
          <div className="inneramount-raised-info">
            <div className="left info">Amount raised in Lovely Inu</div>
            <div className="right info">
              {item?.lovelyInuAmountRaised > 0
                ? item?.lovelyInuAmountRaised / lovelyInuDecimal
                : 0}
            </div>
          </div>
          <div className="inneramount-raised-info">
            <div className="left info">Amount raised in Shiba Inu</div>
            <div className="right info">
              {" "}
              {item?.shibuAmountRaised > 0
                ? item?.shibuAmountRaised / shibaInuDecimal
                : 0}
            </div>
          </div>
          <div className="inneramount-raised-info">
            <div className="left info">Amount raised in Floki</div>
            <div className="right info">
              {" "}
              {item?.flokiAmountRaised > 0
                ? item?.flokiAmountRaised / flokiDecimal
                : 0}
            </div>
          </div>
          <div className="inneramount-raised-info">
            <div className="left info">Amount raised in Safemoon</div>
            <div className="right info">
              {item?.safeMoonAmountRaised > 0
                ? item?.safeMoonAmountRaised / safemoonDecimal
                : 0}
            </div>
          </div>
        </div>
      </Tooltip>
    );
  };
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <div className="create-request">
            <RequestPopup callback={() => OnInit()} />
          </div>
          <div className="table_box">
            <Table responsive hover className="mainTable requestTable">
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Token For Sale</th>
                  <th>Token Price In BNB</th>
                  <th>Start Time</th>
                  <th>Duration</th>
                  <th>Token Sold</th>
                  <th>Amount Raised</th>
                  <th>Token Address</th>
                  <th>Owner Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projectList.length > 0 ? (
                  projectList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.projectId}</td>
                      <td>
                        {item.numberOfTokenForSale / item.tokenDecimal}&nbsp;
                        {item.tokenSymbol}
                      </td>
                      <td>
                        {(item.priceOfTokenInBNB / 10 ** 18).toFixed(12)}&nbsp;
                        {CURRENCY_NAME}
                      </td>
                      <td>
                        {item.StartTime > 0
                          ? moment(item.StartTime * 1000).format(
                              "DD MMM ,YYYY hh:ss A"
                            )
                          : "--"}
                      </td>
                      <td>
                        {CommonService.getDaysFromMilliSecond(item.duration)}
                        &nbsp;Days
                      </td>
                      <td>
                        {item.numberOfTokenSOLD / item.tokenDecimal}&nbsp;
                        {item.tokenSymbol}
                      </td>
                      <td>
                        {/* {item.amountRaised / 10 ** 18}&nbsp;{CURRENCY_NAME} */}
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 300, hide: 400 }}
                          overlay={renderTooltip(item)}
                        >
                          {/* <Button variant="success">Info</Button> */}
                          <span className="badge view-details">
                            View Details{" "}
                          </span>
                        </OverlayTrigger>
                      </td>
                      <td>
                        {CommonService.custmizeAddress(item.tokenAddr)}
                        <CopyClipboard data={item.tokenAddr} />
                      </td>
                      <td>
                        {CommonService.custmizeAddress(item.ownerAddress)}
                        <CopyClipboard data={item.ownerAddress} />
                      </td>
                      <td>
                        {manageIcoStatus(item)}
                        {/* {item.isActive == true && item.isClaimed == false ? (
														<span className="badge bg-success">Active</span>
													) : (
														<span className="badge bg-danger">In Active</span>
													)} */}
                      </td>
                      <td>
                        {Number(item.StartTime) === 0 ? (
                          <Button
                            type="button"
                            className="cus-btn"
                            onClick={(e) => {
                              approveIcoHandler(e, item.projectId);
                            }}
                          >
                            Approve
                          </Button>
                        ) : (
                          <span className="approveElseCondition">
                            <center>--</center>
                          </span>
                        )}
                        {/* {item.numberOfTokenForSale === item.numberOfTokenSOLD ||
												item.isSameDayToClaim === true ? (
													<Button
														type="button"
														className="cus-btn"
														onClick={(e) => {
															claimMoneyHandler(e, item.projectId);
														}}
													>
														Claim
													</Button>
												) : (
													<Button
														type="button"
														className="cus-btn"
														onClick={(e) => {
															claimMoneyHandler(e, item.projectId);
														}}
														disabled={true}
													>
														Claim
													</Button>
												)} */}
                        {/* {manageButtons(item)} */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <td className="text-center" colSpan="11">
                    No records found
                  </td>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectRequest;
