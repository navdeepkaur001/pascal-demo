import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button,Row, Col, Form } from "react-bootstrap";
import "./RequestPopup.scss";
import * as Session from "../../utils/session";
import {
  createIcoRequestAction,
  toCheckAllowanceAction,
  toApproveAllowanceAction,
} from "../../redux/action/user.action";
import { toast } from "../Toast/Toast";
import { CommonService } from "../../utils/commonService";
import {BsFillInfoCircleFill } from "react-icons/bs";

const MetaPopup = (props) => {
  const dispatch = useDispatch();
  const walletType = Session.getLoginSession();
  const walletAddress = useSelector((state) => state.connect.metamaskAddress);

  const [noOfToken, setNoOfToken] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [address, setAddress] = useState("");
  const [duration, setDuration] = useState("");
  //vesting time state
   const [vestingTime, setVestingTime] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShow(false);
    setNoOfToken("");
    setTokenPrice("");
    setAddress("");
    setDuration("");
    setVestingTime("");
  };
  const handleShow = () => setShow(true);

  const createRequestIco = async (e) => {
    e.preventDefault();
    if (props && props.redmarsBalance <= 0) {
      return toast.error("Insufficient Redmars Balance.");
    }
    // to check allowance

    let data = {};
    data.type = "createIco";
    data.walletAddress = walletAddress;
    data.noOfToken = noOfToken; // no. of token  is multiplied with token decimals
    data.tokenPrice = CommonService.convertWithDecimal(tokenPrice, 10 ** 18); // token price multiplied with bnb decimals
    data.address = address;
    data.duration = duration;
    //vesting time
    data.vestingTime = vestingTime;
    let checkAllowance = await dispatch(
      toCheckAllowanceAction(walletType, data)
    );

    if (Number(checkAllowance) <= 0) {
      let checkAllowanceApproval = await dispatch(
        toApproveAllowanceAction(walletType, data)
      );
    }
    let result = await dispatch(createIcoRequestAction(walletType, data));
    if (result && result.status) {
      toast.success("Ico Request created successfully.");
      setShow(false);
      setNoOfToken("");
      setTokenPrice("");
      setAddress("");
      setDuration("");
      setVestingTime("")
      props.callback();
      handleClose();
    }
    handleClose();
  };
  return (
		<>
			{/* <span>
        Redmars Balance &nbsp;
        {props && props.redmarsBalance > 0 ? props.redmarsBalance : 0}
      </span> */}
			<Button href="#" className="connect-btn c_reqst" onClick={handleShow}>
				Create Request
			</Button>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Create Request</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={(e) => createRequestIco(e)}>
						<Row>
							<Col lg={12}>
								<Form.Group className="mb-3" controlId="tokenNumbers">
									<Form.Label>Number of Tokens</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter no. of token"
										value={noOfToken}
										onChange={(e) => {
											let result = CommonService.allowOnlyNumber(
												e.target.value
											);
											if (result == true) {
												setNoOfToken(e.target.value);
											}
										}}
									/>
								</Form.Group>
							</Col>
							<Col lg={12}>
								<Form.Group className="mb-3" controlId="tokenPrice">
									<Form.Label>Price of Tokens(In Bnb)</Form.Label>
									<Form.Control
										type="text"
										placeholder="Token Price"
										value={tokenPrice}
										onChange={(e) => {
											let result = CommonService.allowOnlyNumber(
												e.target.value
											);
											if (result == true) {
												setTokenPrice(e.target.value);
											}
										}}
									/>
								</Form.Group>
							</Col>
							<Col lg={12}>
								<Form.Group className="mb-3" controlId="tokenPrice">
									<Form.Label>Duration(In Days)</Form.Label>
									<Form.Control
										type="text"
										placeholder="Total Duration"
										value={
											duration
												? CommonService.getDaysFromMilliSecond(duration)
												: null
										}
										onChange={(e) => {
											let result = CommonService.allowOnlyNumber(
												e.target.value
											);
											if (result == true) {
												setDuration(
													CommonService.getMilliseconds(e.target.value)
												);
											}
										}}
									/>
								</Form.Group>
							</Col>
							<Col lg={12}>
								<Form.Group className="mb-3" controlId="tokenAdd">
									<Form.Label>Token Address</Form.Label>
									<Form.Control
										type="text"
										placeholder="Token Address"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col lg={12}>
								<Form.Group className="mb-3" controlId="vestingTime">
									<Form.Label>Vesting Time(In Days)</Form.Label>{" "}
									<span
										data-toggle="tooltip"
										data-placement="top"
										title="Vesting time will start after ICO ends"
									>
										<BsFillInfoCircleFill />
									</span>
									<Form.Control
										type="text"
										placeholder="Vesting Time"
										value={
											vestingTime
												? CommonService.getDaysFromMilliSecond(vestingTime)
												: null
										}
										onChange={(e) => {
											let result = CommonService.allowOnlyNumber(
												e.target.value
											);
											if (result == true) {
												setVestingTime(
													CommonService.getMilliseconds(e.target.value)
												);
											}
										}}
									/>
								</Form.Group>
							</Col>
							<Col lg={12} className="text-right mt-2">
								<Button variant="primary" type="submit" className="cm_btn">
									Submit
								</Button>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default MetaPopup;
