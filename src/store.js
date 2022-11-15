import { createSlice, configureStore } from "@reduxjs/toolkit";
import img1 from "./image/page5.jpg";
import img2 from "./image/page6.jpg";
import img3 from "./image/page7.jpg";
import img4 from "./image/page8.jpg";
import img7 from "./image/page3.jpg";
import img8 from "./image/page4.jpg";
import img5 from "./image/page1.jpg";
import img6 from "./image/page2.jpg";

// data or img 소스 받아오는 state
let contents = createSlice({
  name: "contents",
  initialState: [img1, img2, img3, img4, img5, img6, img7, img8],
});

// width 값
let widthResult = createSlice({
  name: "widthResult",
  initialState: 310,
});

export default configureStore({
  reducer: {
    contents: contents.reducer,
    widthResult: widthResult.reducer,
  },
});
