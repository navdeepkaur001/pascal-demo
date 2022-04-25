import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import icon from "../../Assets/images/metamask.png";
import icon1 from "../../Assets/images/wallet-connect.svg";
import binanceIcon from "../../Assets/images/Binance-Icon.png";
import trustWalletIcon from "../../Assets/images/trust-wallet.png";

import * as Session from "../../utils/session";
import {
  connectWithWallet,
  disconnectAddress,
} from "../../redux/action/connect.action";
import "./MetaPopup.scss";
import { useDispatch, useSelector } from "react-redux";
import { CommonService } from "../../utils/commonService";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "../Toast/Toast";

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router-dom";

const MetaPopup = (props) => {
  const walletAddress = useSelector((state) => state.connect.metamaskAddress);

  const history = useHistory();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const connectToWallet = async (e, type) => {
    e.preventDefault();
    let Type = type.toUpperCase();
    Session.setLoginSession(Type);
    let result = await dispatch(connectWithWallet(Type));
    if (result) {
      handleClose(false);
      window.location.reload();
    }
    //  handleClose(false);
    //  window.location.reload();
  };

  const handleYes = async () => {
    await dispatch(disconnectAddress());
    toast.success("Logout Successfully.");
    Session.removeLoginSession();
    history.push("/");
    window.location.reload();
  };
  const disconnect = () => {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleYes(),
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };
  return (
    <>
      <span className="walletAddress_span">
        {walletAddress ? CommonService.custmizeAddress(walletAddress) : null}
      </span>
      {walletAddress ? (
        <Button
          type="button"
          className="connect-btn"
          onClick={(e) => disconnect(e)}
        >
          Disconnect
        </Button>
      ) : (
        <Button href="#" className="connect-btn" onClick={handleShow}>
          Connect
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="pop_body"
            onClick={(e) => connectToWallet(e, "metamask")}
          >
            <p className="text-muted">Meta Mask</p>
            <img src={icon} alt="" />
          </div>
          <div
            className="pop_body"
            onClick={(e) => connectToWallet(e, "walletconnect")}
          >
            <p className="text-muted">Wallet Connect</p>
            <img src={icon1} alt="" />
          </div>
          <div
            className="pop_body"
            onClick={(e) => connectToWallet(e, "binance")}
          >
            <p className="text-muted">Binance Chain</p>
            <img width={30} src={binanceIcon} alt="" />
          </div>
          <div
            className="pop_body"
            onClick={(e) => connectToWallet(e, "trustwallet")}
          >
            <p className="text-muted">Trust Wallet</p>
            <img width={30} src={trustWalletIcon} alt="" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MetaPopup;
