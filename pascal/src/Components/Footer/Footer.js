import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Footer.scss";
import icon from "../../Assets/images/Logo.png";
import fb from "../../Assets/images/fb.png";
import twitter from "../../Assets/images/twitter.png";
import instagram from "../../Assets/images/instagram.png";
import linkedin from "../../Assets/images/linkedin.png";
import telegram from "../../Assets/images/telegram.png";
import { contactFormAction } from "../../redux/action/user.action";
import { toast } from "../Toast/Toast";

const Footer = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.message = message;

    let result = await dispatch(contactFormAction(data));
    if (result && result.status == 200) {
      toast.success(
        "Your message has been sent successfully,we'll get back to you soon."
      );
    }
    setFirstName("");
    setLastName("");
    setMessage("");
  };
  return (
    <>
      <section className="footer_sec" id="section8">
        <Container className="custom-width">
          <Row>
            <Col md={6} lg={6}>
              <div className="footer_logo mb-4">
                <img src={icon} alt="" />
              </div>
              <div className="footer-col">
                <div className="footer_text">
                  <p>
                    REDMARS is a decentralized BSC Network token that aims to
                    bring multiple aspects together to contribute our part to
                    serve the humanity in terms of space technology and economy.
                  </p>
                </div>
                <div className="social">
                  <p>Social</p>
                  <ul>
                    <li>
                      <a
                        href="https://www.facebook.com/Red-Mars-100778685729697/"
                        target="_blank"
                      >
                        <img src={fb} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://t.me/redmarscoinofficial"
                        target="_blank"
                      >
                        <img src={telegram} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/redmarsoffical"
                        target="_blank"
                      >
                        <img src={twitter} />
                      </a>
                    </li>

                    <br />

                    <li>
                      <a
                        href="https://instagram.com/redmarscoinofficial?utm_medium=copy_link"
                        target="_blank"
                      >
                        <img src={instagram} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/red-mars"
                        target="_blank"
                      >
                        <img src={linkedin} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col md={6} lg={6}>
              <div className="form_text">
                <p>For Any Query Fill The Form Down Below</p>
              </div>
              <Form onSubmit={(e) => onSubmitHandler(e)}>
                <Row>
                  <Col lg={6} md={12} className="mb-3">
                    <Form.Control
                      placeholder="First name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </Col>
                  <Col lg={6} md={12} className="mb-3">
                    <Form.Control
                      placeholder="Last name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        as="textarea"
                        rows={5}
                        maxlength={300}
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                      <span className="count_span">{message.length}/300</span>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="foot_btn">
                  <Button variant="primary" type="submit" className="cm_btn">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Footer;
