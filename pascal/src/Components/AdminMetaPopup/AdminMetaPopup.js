import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import icon from "../../Assets/images/metamask.png";
import icon1 from "../../Assets/images/wallet-connect.svg";
import * as Session from "../../utils/session";
import { connectWithWallet } from "../../redux/action/connect.action";
import "./AdminMetaPopup.scss";
import { useDispatch, useSelector } from "react-redux";

import binanceIcon from "../../Assets/images/Binance-Icon.png";
import trustWalletIcon from "../../Assets/images/trust-wallet.png";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const AdminMetaPopup = (props) => {
  const walletAddress = useSelector((state) => state.connect.metamaskAddress);
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
  };

  return (
    <>
      <div className="text-center pb-4">
        {!walletAddress ? (
          <Button href="#" className="connect-btn" onClick={handleShow}>
            Connect
          </Button>
        ) : null}
      </div>

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

export default AdminMetaPopup;
