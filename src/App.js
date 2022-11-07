import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Alert } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAngleRight,
  faAngleLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

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
let Slider = styled.div`
  width: 300px;
  height: 500px;
  margin: auto;
  overflow: hidden;
`;
let SliderGroup = styled.div`
  width: 900px;
  height: 500px;
  margin: auto;
  transition: all 1s;
  transform: translateX(${(props) => props.x}px);
`;
let SliderContent = styled.div`
  background: ${(props) => props.bg};
  width: 300px;
  height: 500px;
  margin: auto;
  float: left;
`;

function App() {
  const keyboard = Array.from({ length: 31 }, (v, i) => i + 1);
  let [pageNum, setPageNum] = useState(keyboard);
  let [slideWidth, setSlideWidth] = useState(0);

  return (
    <div className="App">
      <Slider>
        <SliderGroup x={slideWidth}>
          <SliderContent bg="orange"></SliderContent>
          <SliderContent bg="red"></SliderContent>
          <SliderContent bg="yellow"></SliderContent>
        </SliderGroup>
      </Slider>
      <NavBar
        pageNum={pageNum}
        slideWidth={slideWidth}
        setSlideWidth={setSlideWidth}
      />
    </div>
  );
}

function NavBar(props) {
  return (
    <div className="controlBar">
      <CircleBox>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </CircleBox>
      <CircleBox
        onClick={() => {
          props.slideWidth == 0
            ? alert("1번째 페이지입니다.")
            : props.setSlideWidth(props.slideWidth + 300);
        }}
        className="prev"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </CircleBox>
      <NormalBox>
        {props.pageNum[0]} / {props.pageNum.slice(-1)}
      </NormalBox>
      <CircleBox
        onClick={() => {
          props.slideWidth == -600
            ? alert("마지막 페이지입니다.")
            : props.setSlideWidth(props.slideWidth - 300);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </CircleBox>
      <CircleBox>
        <FontAwesomeIcon icon={faAnglesRight} />
      </CircleBox>
    </div>
  );
}

export default App;
