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
  // transition: all 0.3s;
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
  height: 860px;
  margin: auto;
  overflow: hidden;
  position: relative;
  bottom: -50px;
  // transition: 0.3s;
`;
let SliderGroup = styled.div`
  width: ${(props) => props.width}vw;
  height: 860px;
  margin: auto;
  // transition: all 0.3s;
  transform: translateX(${(props) => props.x}vw);
`;
let SliderContent = styled.div`
  // background: ${(props) => props.bg};
  width: ${(props) => props.width}vw;
  height: 860px;
  margin: auto;
  float: left;
  // transition: 0.3s;
`;

function App() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  return (
    <div className="App">
      <Slider width={state.imgWidth}>
        <SliderGroup
          x={state.slideWidth}
          width={state.contents.length * state.imgWidth}
        >
          {state.contents.map(function (a, i) {
            return (
              <SliderContent
                key={i}
                className={"slideImg start " + state.conClass[i]}
                bg={a}
                width={state.imgWidth}
              >
                <img
                  src={state.contents[i]}
                  style={{ width: state.conWidth }}
                />
              </SliderContent>
            );
          })}
        </SliderGroup>
      </Slider>
      {state.zoomState == true ? <ZoomBar /> : null}
      <NavBar />
    </div>
  );
}

function NavBar(props) {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

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
    copy[props.contents.length - 1] = "end";
    props.setConClass(copy);
  };
  let removeFade = () => {
    let copy = [...props.conClass];
    copy[props.pageNum - 2] = "end";
    copy[props.pageNum - 1] = "";
    props.setConClass(copy);
    console.log(props.pageNum - 1);
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
        // onClick={() => {
        //   state.slideWidth == 0
        //     ? alert("1번째 페이지입니다.")
        //     : props.setSlideWidth(props.slideWidth + props.imgWidth);
        //   state.slideWidth == 0
        //     ? state.pageNum
        //     : props.setPageNum(props.pageNum - 1);
        //   state.slideWidth == 0
        //     ? props.setPageNum(props.pageNum)
        //     : removeFade();
        // }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </CircleBox>
      <NormalBox>
        {state.pageNum} / {state.contents.length}
      </NormalBox>
      <CircleBox
        className="circleBtn"
        // onClick={() => {
        //   state.slideWidth ==
        //   state.contents.length * -state.imgWidth + state.imgWidth
        //     ? alert("마지막 페이지입니다.")
        //     : props.setSlideWidth(state.slideWidth - state.imgWidth);
        //   state.slideWidth ==
        //   state.contents.length * -state.imgWidth + state.imgWidth
        //     ? state.pageNum
        //     : dispatch(nextNum());
        //   state.slideWidth ==
        //   state.contents.length * -state.imgWidth + state.imgWidth
        //     ? props.setPageNum(state.pageNum)
        //     : fade();
        // }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </CircleBox>
      <CircleBox
        className="circleBtn"
        onClick={() => {
          props.slideWidth ==
          props.contents.length * -props.imgWidth + props.imgWidth
            ? alert("마지막 페이지입니다.")
            : props.setSlideWidth(
                props.contents.length * -props.imgWidth + props.imgWidth
              );
          props.slideWidth ==
          props.contents.length * -props.imgWidth + props.imgWidth
            ? props.setPageNum(props.pageNum)
            : props.setPageNum(props.contents.length);
          fade2();
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </CircleBox>

      <CircleBox
      // onClick={() => {
      //   let copy = props.maxWidth;
      //   props.setConWidth(copy);
      //   props.setZoomState(true);
      // }}
      >
        +
      </CircleBox>
    </div>
  );
}

function ZoomBar(props) {
  console.log("");
  return (
    <div className="zoomBar">
      <div className="main-btn-group">
        <input
          type="range"
          min="1"
          max="100"
          onChange={(e) => {
            props.setConWidth(props.maxControl);
            props.setMaxControl(props.widthResult + e.target.value * 10);
          }}
        ></input>
        <button
          className="btn"
          onClick={() => {
            let copy = props.widthResult;
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
