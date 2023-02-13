import $ from "jquery";
import html2canvas from "html2canvas";

const displayEl = document.getElementById("display-artifacts");
const screenshotContainerEl = document.getElementById("screenshot-container");
const screenshotDownloadEl = document.getElementById("screenshot-download");
const $screenshotModal = $("#screenshot-modal");
const $root = $("#root")

$("#screenshot-button").on("click", function () {
  toggleScreenshotModal();

  html2canvas(displayEl).then((canvas) => {
    screenshotContainerEl.innerHTML = "";
    canvas.id = "screenshot-canvas";
    screenshotContainerEl.appendChild(canvas);
    createScreenshotImage(canvas, screenshotDownloadEl);
  });
});

$(".modal-close").on("click", () => {
  toggleScreenshotModal();
});

const toggleScreenshotModal = () => {
  $screenshotModal.toggleClass("hidden");

  !$screenshotModal.hasClass("hidden") ? $root.addClass('scroll-none') : $root.removeClass('scroll-none')
};

const createScreenshotImage = (canvas, linkEl) => {
  const image = canvas
    .toDataURL("image/png", 1.0)
    .replace("image/png", "image/octet-stream");
  linkEl.download = "screenshot.png";
  linkEl.href = image;
};