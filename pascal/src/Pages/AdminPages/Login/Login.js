import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Logo from "../../../Assets/images/Logo.png";
import MetaPopup from "../../../Components/MetaPopup/MetaPopup";
import { adminRootName } from "../../../constant";
import { toGetOwnerAddressAction } from "../../../redux/action/admin.action";
import * as Session from "../../../utils/session";
import "./Login.scss";
import { toast } from "../../../Components/Toast/Toast";
import AdminMetaPopup from "../../../Components/AdminMetaPopup/AdminMetaPopup";
import { setLoginStatus } from "../../../redux/action/connect.action";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const metamaskAddress = useSelector((state) =>
    state.connect.metamaskAddress ? state.connect.metamaskAddress : false
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const loginHandler = async () => {
    if (metamaskAddress !== false) {
      let walletType = Session.getLoginSession();
      let ownerAddress = await dispatch(toGetOwnerAddressAction(walletType));

      if (ownerAddress.toLowerCase() == metamaskAddress.toLowerCase()) {
         await dispatch(setLoginStatus(true));
        history.push(`${adminRootName}/project/requests`);
      } else {
        toast.error("Please connect with admin address.");
      }
    } else {
      toast.error("Please connect with suitable wallet first.");
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Row className="adjustble_vh">
          <Col lg="7" md={10} className="mx-auto">
            <div className="login_area">
              <div className="LogoBox text-center">
                <img src={Logo} alt="echain-logo" />
              </div>
              <AdminMetaPopup
                show={show}
                handleShow={handleShow}
                handleClose={handleClose}
              />

              <form>
                {metamaskAddress !== false ? (
                  <div className="main_walletAddress">
                    <span className="walletAddress_span">
                      {metamaskAddress}
                    </span>
                  </div>
                ) : null}
                <Form.Group className="buttomBtn col-12 text-center pt-4">
                  <Button
                    type="button"
                    className="connect-btn"
                    onClick={() => loginHandler()}
                  >
                    Login
                  </Button>
                </Form.Group>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;
