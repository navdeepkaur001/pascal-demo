import React from "react";
import { Link, useHistory } from "react-router-dom";
import goBack from "../../Assets/images/goBack.svg";
import "./ButtonBackStyle.scss";

const ButtonBack = (props) => {
  const history = useHistory();
  return (
    <Link
      className="goBackButtonStyle"
      to={{ javascript: void 0 }}
      onClick={() => {
        history.push("/");
        window.location.reload();
      }}
    >
      <img src={goBack} />
    </Link>
  );
};

export default ButtonBack;
