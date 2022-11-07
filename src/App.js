import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAngleRight,
  faAngleLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";

let CircleBox = styled.button`
  background: #ddd;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  border: none;
  color: #fff;
  margin: 8px;
`;
let NormalBox = styled.button`
  background: #ddd;
  border-radius: 15px;
  width: 90px;
  height: 30px;
  border: none;
  color: #fff;
  margin: 0 15px;
`;

function App() {
  const keyboard = Array.from({ length: 31 }, (v, i) => i + 1);
  let [pageNum, setPageNum] = useState(keyboard);
  console.log(pageNum[0]);
  return (
    <div className="App">
      <NavBar pageNum={pageNum} />
    </div>
  );
}

function NavBar(props) {
  return (
    <div className="controlBar">
      <CircleBox>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </CircleBox>
      <CircleBox>
        <FontAwesomeIcon icon={faAngleLeft} />
      </CircleBox>
      <NormalBox>
        {props.pageNum[0]} / {props.pageNum.slice(-1)}
      </NormalBox>
      <CircleBox>
        <FontAwesomeIcon icon={faAngleRight} />
      </CircleBox>
      <CircleBox>
        <FontAwesomeIcon icon={faAnglesRight} />
      </CircleBox>
    </div>
  );
}

export default App;
