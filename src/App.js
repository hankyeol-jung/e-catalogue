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
  width: ${(props) => props.width}px;
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
  let [pageNum, setPageNum] = useState(1);
  // 슬라이트 너비 state
  let [slideWidth, setSlideWidth] = useState(0);
  // data or img 소스 받아오는 state
  let [contents, setContents] = useState([
    "orange",
    "red",
    "yellow",
    "black",
    "gray",
  ]);

  return (
    <div className="App">
      <Slider>
        <SliderGroup x={slideWidth} width={contents.length * 300}>
          {contents.map(function (a, i) {
            return <SliderContent bg={a}></SliderContent>;
          })}
        </SliderGroup>
      </Slider>
      <NavBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        slideWidth={slideWidth}
        setSlideWidth={setSlideWidth}
        contents={contents}
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
          props.slideWidth == 0
            ? props.setPageNum(props.pageNum)
            : props.setPageNum(props.pageNum - 1);
        }}
        className="prev"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </CircleBox>
      <NormalBox>
        {props.pageNum} / {props.contents.length}
      </NormalBox>
      <CircleBox
        onClick={() => {
          props.slideWidth == props.contents.length * -300 + 300
            ? alert("마지막 페이지입니다.")
            : props.setSlideWidth(props.slideWidth - 300);
          props.slideWidth == props.contents.length * -300 + 300
            ? props.setPageNum(props.pageNum)
            : props.setPageNum(props.pageNum + 1);
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
