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
import React from "react";
import img1 from "./image/page1.jpg";
import img2 from "./image/page2.jpg";
import img3 from "./image/page3.jpg";
import img4 from "./image/page4.jpg";
import img5 from "./image/page5.jpg";
import img6 from "./image/page6.jpg";
import img7 from "./image/page7.jpg";
import img8 from "./image/page8.jpg";

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
  height: 860px;
  margin: auto;
  overflow: hidden;
  position: relative;
  bottom: -50px;
  transition: 0.3s;
`;
let SliderGroup = styled.div`
  width: ${(props) => props.width}vw;
  height: 860px;
  margin: auto;
  transition: all 0.3s;
  transform: translateX(${(props) => props.x}vw);
`;
let SliderContent = styled.div`
  // background: ${(props) => props.bg};
  width: ${(props) => props.width}vw;
  height: 860px;
  margin: auto;
  float: left;
  transition: 0.3s;
`;

function App() {
  let [pageNum, setPageNum] = useState(1);
  // 슬라이트 너비 state
  let [slideWidth, setSlideWidth] = useState(0);
  // data or img 소스 받아오는 state
  let [contents, setContents] = useState([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
  ]);
  // data or img 소스 받아오는 state
  let [conClass, setConClass] = useState(["end", "", "", "", "", "", "", ""]);
  // img width 값
  let [imgWidth, setImgWidth] = useState(100);
  // width 값
  let [widthResult, setWidthResult] = useState(310);
  // img width 값
  let [conWidth, setConWidth] = useState(widthResult);
  // 확대 width 값
  let [maxWidth, setMaxWidth] = useState(810);
  // 프로그래스 값
  let [maxControl, setMaxControl] = useState(1);
  // 애니메이션 태그 state
  let [fade, setFade] = useState("");
  // 줌인 상태
  let [zoomState, setZoomState] = useState(false);

  return (
    <div className="App">
      <Slider width={imgWidth}>
        <SliderGroup x={slideWidth} width={contents.length * imgWidth}>
          {contents.map(function (a, i) {
            return (
              <SliderContent
                key={i}
                className={"slideImg start " + conClass[i]}
                bg={a}
                width={imgWidth}
              >
                <img src={contents[i]} style={{ width: conWidth }} />
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
          widthResult={widthResult}
          setWidthResult={setWidthResult}
          conWidth={conWidth}
          setConWidth={setConWidth}
          maxWidth={maxWidth}
          setMaxWidth={setMaxWidth}
          maxControl={maxControl}
          setMaxControl={setMaxControl}
        />
      ) : null}
      <NavBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        slideWidth={slideWidth}
        setSlideWidth={setSlideWidth}
        contents={contents}
        setConClass={setConClass}
        conClass={conClass}
        imgWidth={imgWidth}
        setImgWidth={setImgWidth}
        zoomState={zoomState}
        setZoomState={setZoomState}
        conWidth={conWidth}
        setConWidth={setConWidth}
        widthResult={widthResult}
        setWidthResult={setWidthResult}
        maxWidth={maxWidth}
        setMaxWidth={setMaxWidth}
        maxControl={maxControl}
        setMaxControl={setMaxControl}
      />
    </div>
  );
}

function NavBar(props) {
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
        {props.pageNum} / {props.contents.length}
      </NormalBox>
      <CircleBox
        className="circleBtn"
        onClick={() => {
          props.slideWidth ==
          props.contents.length * -props.imgWidth + props.imgWidth
            ? alert("마지막 페이지입니다.")
            : props.setSlideWidth(props.slideWidth - props.imgWidth);
          props.slideWidth ==
          props.contents.length * -props.imgWidth + props.imgWidth
            ? props.setPageNum(props.pageNum)
            : props.setPageNum(props.pageNum + 1);
          props.slideWidth ==
          props.contents.length * -props.imgWidth + props.imgWidth
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
        onClick={() => {
          let copy = props.maxWidth;
          props.setConWidth(copy);
          props.setZoomState(true);
        }}
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
            props.setMaxControl(props.widthResult + e.target.value * 10);
            // let copy = props.widthResult / 10;
            props.setConWidth(props.maxControl);
            console.log(props.conWidth);
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
