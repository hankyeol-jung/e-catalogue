import { useEffect, useState } from "react";
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
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { nextNum, prevNum } from "./store.js";
import React from "react";

let CircleBox = styled.button`
  background: #ddd;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  border: none;
  color: #fff;
  margin: 8px;
  transition: all 0.3s;
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
  width: ${(props) => props.width}vw;
  height: 880px;
  margin: auto;
  overflow: hidden;
  position: relative;
  bottom: -30px;
  transition: 0.3s;
`;
let SliderGroup = styled.div`
  width: ${(props) => props.width}vw;
  height: 880px;
  margin: auto;
  transition: all 0.3s;
  transform: translateX(${(props) => props.x}vw);
`;
let SliderContent = styled.div`
  // background: ${(props) => props.bg};
  width: ${(props) => props.width}vw;
  height: 880px;
  margin: auto;
  float: left;
  transition: 0.3s;
  display: ${(props) => props.flex};
`;

function App() {
  let state = useSelector((state) => state);

  let [pageNum, setPageNum] = useState(1);
  // 슬라이트 너비 state
  let [slideWidth, setSlideWidth] = useState(0);
  // data or img 소스 받아오는 state
  let [conClass, setConClass] = useState(["end", "", "", "", "", "", "", ""]);
  // img width 값
  let [imgWidth, setImgWidth] = useState(100);
  // img width 값
  let [conWidth, setConWidth] = useState(state.widthResult);
  // 확대 width 값
  let [maxWidth, setMaxWidth] = useState(810);
  // 프로그래스 값
  let [maxControl, setMaxControl] = useState(1);
  // 애니메이션 태그 state
  let [fade, setFade] = useState("");
  // 줌인 상태
  let [zoomState, setZoomState] = useState(false);
  // flex 상태
  let [flex, setFlex] = useState("flex");

  return (
    <div className="App">
      <Slider width={imgWidth}>
        <SliderGroup x={slideWidth} width={state.contents.length * imgWidth}>
          {state.contents.map(function (a, i) {
            return (
              <SliderContent
                key={i}
                className={"slideImg start " + conClass[i]}
                bg={a}
                width={imgWidth}
                flex={flex}
              >
                <img src={state.contents[i]} style={{ width: conWidth }} />
              </SliderContent>
            );
          })}
        </SliderGroup>
      </Slider>
      {zoomState == true ? (
        <ZoomBar
          imgWidth={imgWidth}
          setImgWidth={setImgWidth}
          zoomState={zoomState}
          setZoomState={setZoomState}
          slideWidth={slideWidth}
          setSlideWidth={setSlideWidth}
          pageNum={pageNum}
          setPageNum={setPageNum}
          conWidth={conWidth}
          setConWidth={setConWidth}
          maxWidth={maxWidth}
          setMaxWidth={setMaxWidth}
          maxControl={maxControl}
          setMaxControl={setMaxControl}
          flex={flex}
          setFlex={setFlex}
        />
      ) : null}
      <NavBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        slideWidth={slideWidth}
        setSlideWidth={setSlideWidth}
        setConClass={setConClass}
        conClass={conClass}
        imgWidth={imgWidth}
        setImgWidth={setImgWidth}
        zoomState={zoomState}
        setZoomState={setZoomState}
        conWidth={conWidth}
        setConWidth={setConWidth}
        maxWidth={maxWidth}
        setMaxWidth={setMaxWidth}
        maxControl={maxControl}
        setMaxControl={setMaxControl}
        flex={flex}
        setFlex={setFlex}
      />
    </div>
  );
}

function NavBar(props) {
  let state = useSelector((state) => state);
  let fade = () => {
    let copy = [...props.conClass];
    copy[props.pageNum - 1] = "";
    copy[props.pageNum] = "end";
    props.setConClass(copy);
  };
  let fade2 = () => {
    let copy = [...props.conClass];
    copy.map(function (a, i) {
      copy[i] = "";
    });
    copy[state.contents.length - 1] = "end";
    props.setConClass(copy);
  };
  let removeFade = () => {
    let copy = [...props.conClass];
    copy[props.pageNum - 2] = "end";
    copy[props.pageNum - 1] = "";
    props.setConClass(copy);
  };
  let removeFade2 = () => {
    let copy = [...props.conClass];
    copy.map(function (a, i) {
      copy[i] = "";
    });
    copy[0] = "end";
    props.setConClass(copy);
  };
  return (
    <div className="controlBar">
      <CircleBox
        className="circleBtn"
        onClick={() => {
          props.slideWidth == 0
            ? alert("1번째 페이지입니다.")
            : props.setSlideWidth(props.slideWidth * 0);
          props.slideWidth == 0
            ? props.setPageNum(props.pageNum)
            : props.setPageNum(props.pageNum * 0 + 1);
          removeFade2();
        }}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </CircleBox>
      <CircleBox
        className="circleBtn"
        onClick={() => {
          props.slideWidth == 0
            ? alert("1번째 페이지입니다.")
            : props.setSlideWidth(props.slideWidth + props.imgWidth);
          props.slideWidth == 0
            ? props.setPageNum(props.pageNum)
            : props.setPageNum(props.pageNum - 1);
          props.slideWidth == 0
            ? props.setPageNum(props.pageNum)
            : removeFade();
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </CircleBox>
      <NormalBox>
        {props.pageNum} / {state.contents.length}
      </NormalBox>
      <CircleBox
        className="circleBtn"
        onClick={() => {
          props.slideWidth ==
          state.contents.length * -props.imgWidth + props.imgWidth
            ? alert("마지막 페이지입니다.")
            : props.setSlideWidth(props.slideWidth - props.imgWidth);
          props.slideWidth ==
          state.contents.length * -props.imgWidth + props.imgWidth
            ? props.setPageNum(props.pageNum)
            : props.setPageNum(props.pageNum + 1);
          props.slideWidth ==
          state.contents.length * -props.imgWidth + props.imgWidth
            ? props.setPageNum(props.pageNum)
            : fade();
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </CircleBox>
      <CircleBox
        className="circleBtn"
        onClick={() => {
          props.slideWidth ==
          state.contents.length * -props.imgWidth + props.imgWidth
            ? alert("마지막 페이지입니다.")
            : props.setSlideWidth(
                state.contents.length * -props.imgWidth + props.imgWidth
              );
          props.slideWidth ==
          state.contents.length * -props.imgWidth + props.imgWidth
            ? props.setPageNum(props.pageNum)
            : props.setPageNum(state.contents.length);
          fade2();
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </CircleBox>

      <CircleBox
        className="circleBtn"
        onClick={() => {
          props.setFlex("");
          let copy = props.maxWidth;
          props.setConWidth(copy);
          props.setZoomState(true);
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </CircleBox>
    </div>
  );
}

function ZoomBar(props) {
  let state = useSelector((state) => state);
  return (
    <div className="zoomBar">
      <div className="main-btn-group">
        <input
          type="range"
          min="1"
          max="100"
          onChange={(e) => {
            props.setMaxControl(state.widthResult + e.target.value * 10);
            props.setConWidth(props.maxControl);
          }}
        ></input>
        <button
          className="btn"
          onClick={() => {
            props.setFlex("flex");
            let copy = state.widthResult;
            props.setConWidth(copy);
            props.setZoomState(false);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default App;
