import $ from "jquery";

const displayEl = $("#display-artifacts");
var zoom = displayEl.data("zoom") || 100;
$(".global-zoom-label").text(zoom + "%");
$(".global-zoom-slider").slider({
  min: 10,
  max: 500,
  value: zoom,
  step: 0.01,
  slide: function (_, ui) {
    const zoom = ui.value;
    const draggableEl = document.getElementsByClassName("draggable");
    Array.from(draggableEl).forEach((el) => {
      el.style.width = `calc(${el.dataset.imgOriginalWidth}px * ${zoom / 100})`;
      el.style.height = `calc(${el.dataset.imgOriginalHeight}px * ${
        zoom / 100
      })`;
    });
    $(".global-zoom-label").text(zoom + "%");
  },
});
