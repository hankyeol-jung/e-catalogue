import { createSlice, configureStore } from "@reduxjs/toolkit";
import img1 from "./image/page1.jpg";
import img2 from "./image/page2.jpg";
import img3 from "./image/page3.jpg";
import img4 from "./image/page4.jpg";
import img5 from "./image/page5.jpg";
import img6 from "./image/page6.jpg";
import img7 from "./image/page7.jpg";
import img8 from "./image/page8.jpg";

// 페이지넘버
let pageNum = createSlice({
  name: "pageNum",
  initialState: 1,
  reducers: {
    nextNum(state) {
      return state + 1;
    },
    prevNum(state) {
      return state - 1;
    },
  },
});

// 슬라이트 너비 state
let slideWidth = createSlice({
  name: "slideWidth",
  initialState: 0,
});

// data or img 소스 받아오는 state
let contents = createSlice({
  name: "contents",
  initialState: [img1, img2, img3, img4, img5, img6, img7, img8],
});

// 클래스 입력
let conClass = createSlice({
  name: "conClass",
  initialState: ["end", "", "", "", "", "", "", ""],
});

// img width 값
let imgWidth = createSlice({
  name: "imgWidth",
  initialState: 100,
});

// width 값
let widthResult = createSlice({
  name: "widthResult",
  initialState: 310,
});

// con width 값
let conWidth = createSlice({
  name: "conWidth",
  initialState: widthResult,
});

// 확대 width 값
let maxWidth = createSlice({
  name: "maxWidth",
  initialState: widthResult + 500,
});

// 애니메이션 태그 state
let fade = createSlice({
  name: "fade",
  initialState: "",
});

// 줌인 상태
let zoomState = createSlice({
  name: "zoomState",
  initialState: false,
});

export let { nextNum, prevNum } = pageNum.actions;

export default configureStore({
  reducer: {
    pageNum: pageNum.reducer,
    slideWidth: slideWidth.reducer,
    contents: contents.reducer,
    conClass: conClass.reducer,
    imgWidth: imgWidth.reducer,
    widthResult: widthResult.reducer,
    conWidth: conWidth.reducer,
    maxWidth: maxWidth.reducer,
    fade: fade.reducer,
    zoomState: zoomState.reducer,
  },
});
