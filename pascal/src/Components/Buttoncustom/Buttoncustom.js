import React from 'react'
import {Button} from 'react-bootstrap';
import './Buttoncustom.scss'
function Buttoncustom(props) {
    return (
      <div>
        <Button className={`${props.className}`}
          //href="#"
          onClick={props.onClick}
        >
          {props.buttontext}
        </Button>
      </div>
    );
}

export default Buttoncustom
