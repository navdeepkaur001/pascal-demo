import React, { useEffect, useState, Suspense } from "react";
import "./Project.scss";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, ProgressBar, Modal, Form } from "react-bootstrap";
import MainHeading from "../../../Components/MainHeading/MainHeading";
// import MetaPopup from "../../../Components/MetaPopup/MetaPopup";
import RequestPopup from "../../../Components/RequestPopup/RequestPopup";
import { CommonService } from "../../../utils/commonService";
import {
  calculateTokensAction,
  investTokenAction,
  projectCounterAction,
  projectInfoAction,
  tokenDetailsAction,
  redmarsTokenDetailsAction,
  redmarsTokenAction,
  claimUserTokenInfoAction,
  userInfoAction,
  claimUserTokenAction,
  toGetTokensDecimalsAction,
  toGetAmountRaisedAction,
  toGetVestedTimeAction,
  toApproveAllowanceToBuyTokenAction,
  toCheckAllowanceToBuyTokenAction,
} from "../../../redux/action/user.action";
import * as Session from "../../../utils/session";
import BigNumber from "big-number/big-number";
import { toast } from "../../../Components/Toast/Toast";
import { TOKEN_LIST_ENUM, TOKENS_TYPE } from "../../../constant";
import Timer from "../../../Components/Timer/Timer";
import moment from "moment";
import { toClaimMoneyAction } from "../../../redux/action/admin.action";
import ReactComponentLazyLoader from "react-component-lazy-loader";

const Project = () => {
  const dispatch = useDispatch();
  const [leftTime, setLeftTime] = useState({});

  const walletAddress = useSelector((state) =>
    state.connect.metamaskAddress ? state.connect.metamaskAddress : false
  );
  const walletType = Session.getLoginSession();
  const [relaodScreen, setReloadScreen] = useState(false);
  const [projectInfo, setProjectInfo] = useState([]);
  const [show, setShow] = useState(false);
  const [bnb, setBnb] = useState(0);
  const [projectData, setProjectData] = useState();
  const [calulatedToken, setCalculatedToken] = useState(0);
  const [redmarsTokenBalance, setRedmarsTokenBalance] = useState(0);
  const [nomicsData, setNomicsData] = useState();
  //set token type state
  const [selectedTokenType, setTokenType] = useState(0); //default set is bnb

  const handleClose = () => {
    setShow(false);
    setBnb(0);
    setCalculatedToken(0);
    setTokenType(0);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    addRemoveClass();
    if (walletAddress !== false) {
      onIt();
      redmarsTokenDetails();
    }
  }, []);

  useEffect(() => {
    if (bnb != undefined && bnb != "" && bnb != null) {
      convertedToken();
    }
  }, [selectedTokenType, bnb]);

  const redmarsTokenDetails = async () => {
    let result = await dispatch(redmarsTokenDetailsAction(walletType));
    if (result) {
      let data = {};
      data.tokenAddress = result?.redMarsTokenAddress;
      data.walletAddress = walletAddress;

      let redmarsTokenInfo = await dispatch(
        redmarsTokenAction(walletType, data)
      );

      if (redmarsTokenInfo) {
        let balance =
          redmarsTokenInfo?.redmarsTokenBalance /
          redmarsTokenInfo?.redmarsTokenDecimal;
        setRedmarsTokenBalance(balance);
      }
    }
  };
  const addRemoveClass = () => {
    document.body.classList.add("project_page");
    return () => {
      document.body.classList.remove("project_page");
    };
  };

  //function to get project info and amount raises value for differnt type and resp decimals

  const onIt = async () => {
    let projectInfo, projectCounter;
    let array = [];
    projectCounter = await dispatch(projectCounterAction(walletType));
    if (projectCounter > 0) {
      for (let i = 0; i < projectCounter; i++) {
        projectInfo = await dispatch(projectInfoAction(walletType, i + 1));

        let commonDetails = await dispatch(
          tokenDetailsAction(walletType, projectInfo?.tokenAddr)
        );
        let data = {};
        data.walletAddress = walletAddress;
        data.projectId = i + 1;
        let userInfo = await dispatch(userInfoAction(walletType, data));
        projectInfo.tokenSymbol = commonDetails?.symbol;
        projectInfo.decimal = commonDetails?.decimal;
        projectInfo.tokenName = commonDetails?.tokenName;

        projectInfo.projectId = i + 1;
        projectInfo.userInfo = userInfo;

        //to get amount raised details of an ico
        let data1 = {};
        data1.tokenType = 0;
        data1.projectId = i + 1;
        let res1 = await dispatch(toGetAmountRaisedAction(walletType, data1));
        let data2 = {};
        data2.tokenType = 1;
        data2.projectId = i + 1;
        let res2 = await dispatch(toGetAmountRaisedAction(walletType, data2));
        let data3 = {};
        data3.tokenType = 2;
        data3.projectId = i + 1;
        let res3 = await dispatch(toGetAmountRaisedAction(walletType, data3));
        let data4 = {};
        data4.tokenType = 3;
        data4.projectId = i + 1;
        let res4 = await dispatch(toGetAmountRaisedAction(walletType, data4));
        let data5 = {};
        data5.tokenType = 4;
        data5.projectId = i + 1;
        let res5 = await dispatch(toGetAmountRaisedAction(walletType, data5));

        let lovelyInuDecimal = await dispatch(
          toGetTokensDecimalsAction(walletType, TOKENS_TYPE.LOVELYINU)
        );
        let shibuDecimal = await dispatch(
          toGetTokensDecimalsAction(walletType, TOKENS_TYPE.SHIBAINU)
        );
        let flokiDecimal = await dispatch(
          toGetTokensDecimalsAction(walletType, TOKENS_TYPE.FLOKI)
        );
        let safeMoonDecimal = await dispatch(
          toGetTokensDecimalsAction(walletType, TOKENS_TYPE.SAFEMOON)
        );

        // end
        //functionality to get vested time of an ico
        let vestedTime = await dispatch(
          toGetVestedTimeAction(walletType, i + 1)
        );
        //end

        projectInfo.bnbAmountRaised = res1;
        projectInfo.lovelyInuAmountRaised = res2;
        projectInfo.shibuAmountRaised = res3;
        projectInfo.flokiAmountRaised = res4;
        projectInfo.safeMoonAmountRaised = res5;

        projectInfo.lovelyDecimal = 10 ** lovelyInuDecimal;
        projectInfo.shibuDecimal = 10 ** shibuDecimal;
        projectInfo.flokiDecimal = 10 ** flokiDecimal;
        projectInfo.safeMoonDecimal = 10 ** safeMoonDecimal;
        projectInfo.vestedTime = vestedTime;
        array.push(projectInfo);
        array.sort((a, b) => {
          return b?.projectId - a?.projectId;
        });
        // setProjectInfo((values) => [...values, projectInfo]);
      }
      setProjectInfo(array);
    }
  };

  // investment handler function by using different types
  // type 0->bnb
  // type 1->lovelyInu
  // type 2->shina inu
  // type 3->floki
  // type 4->safemoon

  const investToken = async (e) => {
    e.preventDefault();
    let data = {};
    //if bnb selected  functionality to get get dynamic tokens decimals
    if (selectedTokenType == 0) {
      data.bnb = Number(CommonService.convertWithDecimal(bnb, 10 ** 18));
    } else {
      let tokenAddress;
      if (selectedTokenType == 1) {
        tokenAddress = TOKENS_TYPE.LOVELYINU;
      } else if (selectedTokenType == 2) {
        tokenAddress = TOKENS_TYPE.SHIBAINU;
      } else if (selectedTokenType == 3) {
        tokenAddress = TOKENS_TYPE.FLOKI;
      } else if (selectedTokenType == 4) {
        tokenAddress = TOKENS_TYPE.SAFEMOON;
      }
      let tokenDecimals = await dispatch(
        toGetTokensDecimalsAction(walletType, tokenAddress)
      );
      data.bnb = Number(
        CommonService.convertWithDecimal(bnb, 10 ** tokenDecimals)
      );
    }

    data.projectId = projectData.projectId;
    data.tokenType = selectedTokenType;
    data.walletAddress = walletAddress;

    if (redmarsTokenBalance && redmarsTokenBalance <= 0) {
      return toast.error("Insufficient Redmars Balance.");
    }
    // for bnb
    if (selectedTokenType == 0) {
      let result = await dispatch(investTokenAction(walletType, data));
      if (result && result.status) {
        toast.success("Token Purchased successfully.");
        setBnb();
        onIt();
        handleClose();
      }
      handleClose();
    } else {
      //for other token need to check allowance
      //check allowance
      let checkAllowance = await dispatch(
        toCheckAllowanceToBuyTokenAction(walletType, data)
      );

      if (Number(checkAllowance) <= Number(data.bnb)) {
        await dispatch(toApproveAllowanceToBuyTokenAction(walletType, data));
      }
      let result = await dispatch(investTokenAction(walletType, data));
      if (result && result.status) {
        toast.success("Token Purchased successfully.");
        setBnb();
        onIt();
        handleClose();
      }
      handleClose();
    }
  };
  //function to calculate progress bar value dynamically
  const calculateProgressBar = (item) => {
    let amountToBeRaised = BigNumber(item.numberOfTokenForSale)
      .multiply(item?.priceOfTokenInBNB)
      .multiply(10 ** 18)
      .divide(BigNumber(item?.decimal).multiply(10 ** 18))
      .toString();

    let value = BigNumber(item.amountRaised)
      .multiply(item?.decimal)
      .multiply(100)
      .divide(
        BigNumber(
          BigNumber(item.numberOfTokenForSale).multiply(item?.priceOfTokenInBNB)
        )
      )
      .toString();
    let data = {};
    data.value = value;
    data.amountToBeRaised = amountToBeRaised;
    return data;
  };

  const showBuyModal = (e, item) => {
    e.preventDefault();
    handleShow();
    setProjectData(item);
  };

  //calulate requested Tokens
  const convertedToken = async () => {
    if (bnb != null || bnb != undefined || bnb !== "") {
      let data = {};
      data.projectId = projectData?.projectId;
      //data.bnbAmount = CommonService.convertWithDecimal(bnb, 10 ** 18);
      if (selectedTokenType == 0) {
        data.bnb = CommonService.convertWithDecimal(bnb, 10 ** 18);
      } else {
        let tokenAddress;
        if (selectedTokenType == 1) {
          tokenAddress = TOKENS_TYPE.LOVELYINU;
        } else if (selectedTokenType == 2) {
          tokenAddress = TOKENS_TYPE.SHIBAINU;
        } else if (selectedTokenType == 3) {
          tokenAddress = TOKENS_TYPE.FLOKI;
        } else if (selectedTokenType == 4) {
          tokenAddress = TOKENS_TYPE.SAFEMOON;
        }
        let tokenDecimals = await dispatch(
          toGetTokensDecimalsAction(walletType, tokenAddress)
        );
        data.bnb = CommonService.convertWithDecimal(bnb, 10 ** tokenDecimals);
      }
      data.tokenType = selectedTokenType;
      let result = await dispatch(calculateTokensAction(walletType, data));
      if (result > 0) {
        setCalculatedToken(result);
      } else {
        setCalculatedToken(0);
      }
    }
  };
  //claim user token functionality
  const claimUserToken = async (e, projectId) => {
    e.preventDefault();

    let data = {};
    data.walletAddress = walletAddress;
    data.projectId = projectId;
    let result = await dispatch(claimUserTokenAction(walletType, data));
    if (result && result.status) {
      toast.success("Claimed successfully.");
      onIt();
    }
  };

  // check status to create ico and invest tokens
  const checkIcoStatus = (item) => {
    let totalTime = Number(item.StartTime) + Number(item.duration);

    if (
      moment(totalTime * 1000).isBefore(moment.utc()) ||
      Number(item.numberOfTokenForSale) === Number(item.numberOfTokenSOLD)
    ) {
      return true;
    } else {
      return false;
    }
  };
  //check status of claim user token
  const checkClaimStatus = (item) => {
    let totalTime =
      Number(item.StartTime) + Number(item.duration) + Number(item.vestedTime);

    if (
      moment(totalTime * 1000).isBefore(moment.utc()) &&
      item?.userInfo?.isClaimed === false &&
      item?.userInfo?.tokenAmount > 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  //Function to to restrict user claim button
  const restrictClaim = (e) => {
    e.preventDefault();
    toast.info("You can claim after IDO's is over");
  };

  // Function to claim owner token
  const claimOwnerToken = async (e, projectId) => {
    let data = {};
    data.walletAddress = walletAddress;
    data.projectId = projectId;
    let result = await dispatch(toClaimMoneyAction(walletType, data));
    if (result && result.status) {
      toast.success("Owner claimed successfully.");
      onIt();
    }
  };
  //to visible Owner claim button functioanlity
  const checkOwnerClaimButtonVisibilityStatus = (item) => {
    let icoOwnerAddress = item?.ownerAddress;
    let totalTime = Number(item.StartTime) + Number(item.duration);
    if (
      icoOwnerAddress.toLowerCase() == walletAddress.toLowerCase() &&
      item?.isActive &&
      moment(totalTime * 1000).isBefore(moment.utc()) &&
      Number(item?.numberOfTokenForSale) > Number(item?.numberOfTokenSOLD)
    ) {
      return true;
    } else {
      return false;
    }
  };

  //Integrate function to calculate vesting time for claim button visibility
  const vestedTimerStatus = (item) => {
    let totalTime = Number(item.StartTime) + Number(item.duration);

    if (
      moment(totalTime * 1000).isBefore(moment.utc()) &&
      item?.userInfo?.tokenAmount > 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <section className="project">
        <Container className="custom-width">
          <Row className="project_hd">
            <Col lg={6} md={12}>
              <MainHeading heading="Projects" />
            </Col>
            <Col lg={6} md={12}>
              <div className="seclt_pop">
                <span>
                  Redmars Balance :{" "}
                  {redmarsTokenBalance ? redmarsTokenBalance : 0}{" "}
                </span>
                {/* <RequestPopup
                  callback={() => onIt()}
                  redmarsBalance={redmarsTokenBalance}
                /> */}
              </div>
            </Col>
          </Row>
          <Row>
            {projectInfo && projectInfo.length > 0
              ? projectInfo
                  .sort((a, b) => b.projectId - a.projectId)
                  .map((item, index) => (
                    <>
                      {/* {item?.StartTime == 0 ? null : ( */}
                      <Col xl={4} lg={6} md={12} className="project_block">
                        <div className="block_project">
                          {checkIcoStatus(item) == false ? (
                            <>
                              <span className="badge bg-success">Active</span>
                              <Timer type="icoEndsIn" data={item} />
                            </>
                          ) : (
                            <>
                              <span className="badge bg-danger">InActive</span>

                              <Timer type="icoEndsIn" data={item} />
                            </>
                          )}
                          <div className="list">
                            <>
                              <div className="_projectInfoData">
                                <ul>
                                  <li>
                                    <span>Price:</span>
                                  </li>
                                  <li>Token Name:</li>
                                  <li>No. of Total Tokens:</li>
                                  <li>No. of Sold Tokens:</li>
                                  <li>Days:</li>
                                  <li>Token Bought:</li>
                                </ul>

                                <ul className="ml-3">
                                  <li>
                                    <span>
                                      {(
                                        item?.priceOfTokenInBNB /
                                        10 ** 18
                                      ).toFixed(12)}
                                      &nbsp; BNB
                                    </span>
                                  </li>
                                  <li>{item?.tokenName}</li>
                                  <li>
                                    {item?.numberOfTokenForSale / item?.decimal}
                                    &nbsp;
                                    {item?.tokenSymbol}
                                  </li>
                                  <li>
                                    {item?.numberOfTokenSOLD / item?.decimal}
                                    &nbsp;
                                    {item?.tokenSymbol}
                                  </li>
                                  <li>
                                    {CommonService.getDaysFromMilliSecond(
                                      item?.duration
                                    )}
                                  </li>
                                  <li>
                                    {item?.userInfo?.tokenAmount > 0 ? (
                                      <>
                                        {item?.userInfo?.tokenAmount /
                                          item?.decimal}
                                        &nbsp;
                                        {item.tokenSymbol}
                                      </>
                                    ) : (
                                      0
                                    )}
                                  </li>
                                </ul>
                              </div>

                              <div className="_amountRaisedData">
                                <div className="_inneramountRaisedData">
                                  <div className="left">
                                    Amount Raised in Bnb:
                                  </div>
                                  <div className="right">
                                    {item?.bnbAmountRaised > 0 ? (
                                      <>{item?.bnbAmountRaised / 10 ** 18}</>
                                    ) : (
                                      0
                                    )}
                                  </div>
                                </div>
                                <div className="_inneramountRaisedData">
                                  <div className="left dataBlk">
                                    Amount Raised in Lovely Inu :
                                  </div>
                                  <div className="right dataBlk">
                                    {item?.lovelyInuAmountRaised > 0 ? (
                                      <>
                                        {item?.lovelyInuAmountRaised /
                                          item.lovelyDecimal}
                                      </>
                                    ) : (
                                      0
                                    )}
                                  </div>
                                </div>
                                <div className="_inneramountRaisedData">
                                  <div className="left">
                                    Amount Raised in Shiba Inu :
                                  </div>
                                  <div className="right">
                                    {item?.shibuAmountRaised > 0 ? (
                                      <>
                                        {item?.shibuAmountRaised /
                                          item.shibuDecimal}
                                      </>
                                    ) : (
                                      0
                                    )}
                                  </div>
                                </div>
                                <div className="_inneramountRaisedData">
                                  <div className="left">
                                    Amount Raised in Floki :
                                  </div>
                                  <div className="right">
                                    {item?.flokiAmountRaised > 0 ? (
                                      <>
                                        {item?.flokiAmountRaised /
                                          item.flokiDecimal}
                                      </>
                                    ) : (
                                      0
                                    )}
                                  </div>
                                </div>
                                <div className="_inneramountRaisedData">
                                  <div className="left">
                                    Token Bought in Safemoon :
                                  </div>
                                  <div className="right">
                                    {item?.safeMoonAmountRaised > 0 ? (
                                      <>
                                        {item?.safeMoonAmountRaised /
                                          item.safeMoonDecimal}
                                      </>
                                    ) : (
                                      0
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          </div>
                          <div className="feed_project">
                            {/* code commented of progress bar */}
                            {/* <div className="progress_vlue">
                          <span>
                            {item?.amountRaised > 0
                              ? item?.amountRaised / 10 ** 18
                              : 0}
                            &nbsp; BNB
                          </span>
                          <span>
                            {calculateProgressBar(item)?.amountToBeRaised > 0
                              ? (
                                  calculateProgressBar(item)?.amountToBeRaised /
                                  10 ** 18
                                ).toFixed()
                              : 0}
                            &nbsp; BNB
                          </span>
                        </div>

                        <ProgressBar now={calculateProgressBar(item)?.value} /> */}
                            {vestedTimerStatus(item) ? (
                              <Timer type="vestedTimer" vestedData={item} />
                            ) : null}
                            {checkIcoStatus(item) == false ? (
                              <Button
                                className="project_btn"
                                type="button"
                                onClick={(e) => showBuyModal(e, item)}
                              >
                                Buy Now
                              </Button>
                            ) : null}
                            {checkClaimStatus(item) == true ? (
                              <Button
                                className="project_claimbtn"
                                type="button"
                                onClick={(e) => {
                                  //claimUserToken(e, item?.projectId);
                                  restrictClaim();
                                }}
                                // disabled
                              >
                                Claim
                              </Button>
                            ) : null}
                            &nbsp;
                            {checkOwnerClaimButtonVisibilityStatus(item) ==
                            true ? (
                              <Button
                                className="project_claimbtn"
                                type="button"
                                onClick={(e) => {
                                  claimOwnerToken(e, item?.projectId);
                                }}
                              >
                                Owner Claim
                              </Button>
                            ) : null}
                            <Modal show={show} onHide={handleClose} centered>
                              <Modal.Header closeButton>
                                <Modal.Title>Buy Token</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form>
                                  <div className="custom_select">
                                    <Form.Label>Select Type</Form.Label>
                                    <Form.Select
                                      onChange={(e) =>
                                        setTokenType(e.target.value)
                                      }
                                      className="me-sm-2 form-control"
                                      id="inlineFormCustomSelect"
                                    >
                                      {TOKEN_LIST_ENUM.map((item, index) => (
                                        <>
                                          <option value={index}>
                                            {item.label}
                                          </option>
                                        </>
                                      ))}
                                    </Form.Select>
                                  </div>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="tokenNumbers"
                                  >
                                    <Form.Label>Enter amount</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Amount"
                                      autoComplete="off"
                                      value={bnb}
                                      onChange={(e) => {
                                        let value = e.target.value;
                                        if (value == "") {
                                          setBnb("");
                                        }
                                        let result =
                                          CommonService.allowOnlyNumber(value);
                                        if (result) {
                                          setBnb(e.target.value);
                                        }
                                      }}
                                    />

                                    <p>
                                      Tokens :
                                      {bnb
                                        ? calulatedToken / projectData?.decimal
                                        : 0}
                                      {/* {calulatedToken / projectData?.decimal} */}
                                      &nbsp;
                                      {calulatedToken > 0
                                        ? projectData.tokenSymbol
                                        : null}
                                    </p>
                                  </Form.Group>

                                  <Button
                                    variant="primary"
                                    type="button"
                                    className="cm_btn"
                                    onClick={(e) => investToken(e)}
                                  >
                                    Submit
                                  </Button>
                                </Form>
                              </Modal.Body>
                            </Modal>
                          </div>
                        </div>
                      </Col>
                      {/* // )} */}
                    </>
                  ))
              : null}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Project;
