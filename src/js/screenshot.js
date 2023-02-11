import $ from "jquery";
import html2canvas from "html2canvas";

const displayEl = document.getElementById("display-artifacts");
const screenshotCanvasEl = document.getElementById("screenshot-canvas");

$("#screenshot-button").on("click", function () {
  html2canvas(displayEl).then((canvas) => {
    screenshotCanvasEl.innerHTML = "";
    screenshotCanvasEl.appendChild(canvas);
  });
});
