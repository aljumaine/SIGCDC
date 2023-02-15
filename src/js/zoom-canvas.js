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
    displayEl.css({
      transform: "scale(" + zoom / 100 + ")",
      "transform-origin": "0px 0px",
    });
    displayEl.data("zoom", zoom);
    $(".global-zoom-label").text(zoom + "%");
  },
});
